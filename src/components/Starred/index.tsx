// Module imports
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import starredSlice from '../../data/starredSlice';

// Component and type imports
import Movie from '../Movie';
import { IMovie, IRootState } from '../../types';

// Style imports
import './starred.styles.scss';


// Component props declaration
interface StarredProps {
  viewTrailer: (content: IMovie) => void;
}

// Component declaration
const Starred: React.FC<StarredProps> = ({ viewTrailer }) => {

  // Starred states
  const { starred } = useSelector((state: IRootState) => state);
  const { clearAllStarred } = starredSlice.actions

  // Init hooks
  const dispatch = useDispatch();

  return (
    <div className="starred" data-testid="starred">
      {starred.starredMovies.length > 0 && (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <div className="grid-container">
          {starred.starredMovies.map((movie: IMovie) => (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
            />
          ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" onClick={() => dispatch(clearAllStarred())}>Remove all starred</button>
        </footer>
      </div>)}

      {starred.starredMovies.length === 0 && (<div className="text-center empty-cart">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}
    </div>
  );
};

export default Starred;
