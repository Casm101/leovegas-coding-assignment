// Module imports
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom';

import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants';

// Slice imports
import { fetchMovies } from './data/moviesSlice';

// Component and type imports
import Header from './components/Header';
import MovieContainer from './components/MovieContainer';
import Starred from './components/Starred';
import WatchLater from './components/WatchLater';
import YoutubePlayer from './components/YoutubePlayer';
import { IMovie, IRootState } from './types';

// Style imports
import './styles/app.scss';
import 'reactjs-popup/dist/index.css'


// Main app declaration
const App = () => {

  // Movies state
  const { movies } = useSelector((state: IRootState) => state);

  // Init hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Search paramaters
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  // State declaration
  const [videoKey, setVideoKey] = useState();
  // TODO: open modal
  const [_, setOpen] = useState(false);

  //const closeModal = () => setOpen(false)

  const closeCard = () => { }

  const getSearchResults = (query: string) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER));
      setSearchParams();
    }
  }

  const searchMovies = (query: string) => {
    navigate('/');
    getSearchResults(query);
  };

  const getMovies = () => {
    if (searchQuery) dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery));
    if (!searchQuery) dispatch(fetchMovies(ENDPOINT_DISCOVER));
  };

  const viewTrailer = (movie: IMovie) => {
    getMovie(movie.id);
    if (!videoKey) setOpen(true);
    setOpen(true);
  };

  const getMovie = async (id: string) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    setVideoKey(undefined);
    const videoData = await fetch(URL)
      .then((response) => response.json());

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find((vid: any) => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />

      <div className="container">
        {videoKey ? (
          <YoutubePlayer
            videoKey={videoKey}
          />
        ) : (
          <div style={{ padding: "30px" }}><h6>no trailer available. Try another movie</h6></div>
        )}

        <Routes>
          <Route path="/" element={<MovieContainer movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default App
