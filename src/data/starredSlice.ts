// Module imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../types";

interface StarredState {
    starredMovies: IMovie[];
}

const initialState: StarredState = {
    starredMovies: []
};

const starredSlice = createSlice({
    name: 'starred',
    initialState,
    reducers: {
        starMovie: (state, action: PayloadAction<IMovie>) => {
            state.starredMovies = [action.payload, ...state.starredMovies];
        },
        unstarMovie: (state, action: PayloadAction<{ id: string }>) => {
            const indexOfId = state.starredMovies.findIndex(movie => movie.id === action.payload.id);
            if (indexOfId !== -1) {
                state.starredMovies.splice(indexOfId, 1);
            }
        },
        clearAllStarred: (state) => {
            state.starredMovies = [];
        },
    },
});

export const { starMovie, unstarMovie, clearAllStarred } = starredSlice.actions;
export default starredSlice;
