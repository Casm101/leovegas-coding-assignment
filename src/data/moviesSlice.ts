// Module imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Type imports
import { IMovie } from './../types/index';

// Movie state declaration
interface MoviesState {
    movies: IMovie[];
    page: number;
    fetchStatus: 'idle' | 'loading' | 'success' | 'error';
}

// Initial movie state declaration
const initialState: MoviesState = {
    movies: [],
    page: 1,
    fetchStatus: 'idle',
};

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl: string) => {
    const response = await fetch(apiUrl);
    return response.json();
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        resetMovies: (state) => {
            state.movies = [];
            state.page = 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            if (state.page < 1) state.movies = action.payload.results;
            state.movies = [...state.movies, ...action.payload.results]
            state.fetchStatus = 'success';
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading';
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error';
        })
    }
});

export const { resetMovies } = moviesSlice.actions;

export default moviesSlice;
