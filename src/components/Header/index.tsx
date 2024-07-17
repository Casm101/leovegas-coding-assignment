// Module imports
import { Link, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import RootState from '../../data/store';

// Style imports
import './header.styles.scss';

// Declaration of component props
interface HeaderProps {
  searchMovies: (searchValue: string) => void;
  setSearchParams: (query: string) => void;
  searchParams: URLSearchParams;
}

// Define the shape of the Redux state
interface StarredState {
  starredMovies: Array<any>; // Define a precise type for the movies if possible
}

// Declaration of header component
const Header: React.FC<HeaderProps> = ({ searchMovies }) => {

  const { starredMovies } = useSelector((state: typeof RootState) => state.starred);

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => searchMovies(e.target.value)} className="search-link">
          <input
            type="search"
            data-testid="search-movies"
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => searchMovies((e.target as HTMLInputElement).value)}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </Link>
      </div>
    </header>
  )
};

export default Header;
