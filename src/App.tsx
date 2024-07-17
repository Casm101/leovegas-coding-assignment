// Module imports
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';

import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT_MOVIE } from './constants';

// Slice imports
import { fetchMovies, resetMovies } from './data/moviesSlice';

// Component and type imports
import Header from './components/Header';
import MovieContainer from './components/MovieContainer';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import { IMovie, IRootState } from './types';

// Hook imports
import { useModal } from './context/ModalContext';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';

// Style imports
import './styles/app.scss';
import 'reactjs-popup/dist/index.css'
import { UnknownAction } from '@reduxjs/toolkit';


// Main app declaration
const App = () => {

  // Movies state
  const { movies } = useSelector((state: IRootState) => state);
  const [page, setPage] = useState<number>(1);

  // Init hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showModal } = useModal();

  // Search paramaters
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const getSearchResults = (query: string, page: number = 1) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}&page=${page}`) as unknown as UnknownAction);
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`) as unknown as UnknownAction);
      setSearchParams();
    }
  };

  const searchMovies = (query: string) => {
    navigate('/');
    dispatch(resetMovies());
    setPage(1);
    getSearchResults(query);
  };

  const getMovies = (page: number = 1) => {
    if (searchQuery) dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${searchQuery}&page=${page}`) as unknown as UnknownAction);
    if (!searchQuery) dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`) as unknown as UnknownAction);
  };

  const getMovie = async (id: string) => {
    const URL = ENDPOINT_MOVIE(id);
    const videoData = await fetch(URL)
      .then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid: any) => vid.type === 'Trailer');
      return trailer ? trailer.key : videoData.videos.results[0].key;
    }
  };

  const viewTrailer = async (movie: IMovie) => {
    const key = await getMovie(movie.id);
    console.log('trailer key', key);
    showModal(key);
  };

  const getMoreMovies = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  useInfiniteScroll(getMoreMovies);

  useEffect(() => {
    getMovies(page);
  }, [page]);

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        <Routes>
          <Route path="/" element={<MovieContainer movies={movies} viewTrailer={viewTrailer} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
