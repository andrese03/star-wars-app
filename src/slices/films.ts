import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import * as swapi from "../services/swapi";
import { Film } from "../shared/interfaces";
import type { RootState } from "../store";

// Define a type for the slice state
interface FilmState {
  loading: boolean;
  loadingPool: boolean[];
  error: boolean;
  films: Film[];
  count: number;
  film?: Film;
}

// Initial State
const initialState: FilmState = {
  loading: false,
  loadingPool: [],
  error: false,
  films: [],
  count: 0,
  film: undefined,
};

export const peopleSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    /* Material Requests */
    requestBegin: (state) => {
      state.loadingPool.push(true);
      state.loading = !!state.loadingPool.length;
      state.error = false;
    },
    requestSuccess: (state) => {
      state.loadingPool.shift();
      state.loading = !!state.loadingPool.length;
    },
    requestError: (state) => {
      state.loadingPool.shift();
      state.loading = !!state.loadingPool.length;
      state.error = true;
    },
    setFilms: (state, { payload }) => {
      state.films = payload;
    },
    setFilm: (state, { payload }) => {
      state.film = payload;
    },
    setCount: (state, { payload }) => {
      state.count = payload;
    },
    resetReducer: (state) => {
      state.loading = false;
      state.loadingPool = [];
      state.error = false;
      state.films = [];
      state.film = undefined;
    },
  },
});

const { actions, reducer } = peopleSlice;

// Actions
export const fetchFilms =
  (
    page: number,
    append = false,
    search = ""
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, state) => {
    dispatch(actions.requestBegin());
    try {
      const result = await swapi.fetchFilms(page, search);
      if (append) {
        dispatch(actions.setFilms([...state().films.films, ...result.results]));
      } else {
        dispatch(actions.setCount(result.count));
        dispatch(actions.setFilms(result.results));
      }
      dispatch(actions.requestSuccess());
    } catch (e) {
      dispatch(actions.requestError());
    }
  };

export const fetchFilm =
  (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.requestBegin());
    try {
      const result = await swapi.fetchFilm(id);
      dispatch(actions.setFilm(result));
      dispatch(actions.requestSuccess());
    } catch (e) {
      dispatch(actions.requestError());
    }
  };

export const { setFilm, setFilms, resetReducer } = actions;

export default reducer;
