// Component imports
import Movie from '../Movie';
import { IMovie } from '../../types';

// Style imports
import './moviecontainer.styles.scss';

// Component props declaration
interface MovieContainerProps {
    movies: {
        movies: IMovie[]
    };
    viewTrailer: (content: IMovie) => void;
}

const MovieContainer: React.FC<MovieContainerProps> = ({ movies, viewTrailer }) => {
    return (
        <div className="movies-container" data-testid="movies">
            {movies?.movies?.map((movie) => {
                return (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={viewTrailer}
                    />
                )
            })}
        </div>
    );
};

export default MovieContainer;
