// Component imports
import Movie from '../Movie';

// Type imports
import { IMovie } from '../../types';


// Component props declaration
interface MovieContainerProps {
    movies: {
        movies: IMovie[]
    };
    viewTrailer: (content: IMovie) => void;
    closeCard: () => void;
}

const MovieContainer: React.FC<MovieContainerProps> = ({ movies, viewTrailer, closeCard }) => {
    return (
        <div data-testid="movies">
            {movies?.movies?.map((movie) => {
                return (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={viewTrailer}
                        closeCard={closeCard}
                    />
                )
            })}
        </div>
    );
};

export default MovieContainer;
