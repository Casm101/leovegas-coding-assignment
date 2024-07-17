export interface IMovie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface IRootState {
  movies: {
    movies: IMovie[];
    fetchStatus: string;
  },
  starred: {
    starredMovies: never[];
  },
  watchLater: {
    watchLaterMovies: never[];
  },
}