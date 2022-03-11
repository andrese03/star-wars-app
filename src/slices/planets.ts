import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import * as swapi from "../services/swapi";
import { Planet } from "../shared/interfaces";
import type { RootState } from "../store";

// Define a type for the slice state
interface PlanetState {
  loading: boolean;
  loadingPool: boolean[];
  error: boolean;
  planets: Planet[];
  count: number;
  planet?: Planet;
}

// Initial State
const initialState: PlanetState = {
  loading: false,
  loadingPool: [],
  error: false,
  planets: [],
  count: 0,
  planet: undefined,
};

export const peopleSlice = createSlice({
  name: "planets",
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
    setPlanets: (state, { payload }) => {
      state.planets = payload;
    },
    setPlanet: (state, { payload }) => {
      state.planet = payload;
    },
    setCount: (state, { payload }) => {
      state.count = payload;
    },
    resetReducer: (state) => {
      state.loading = false;
      state.loadingPool = [];
      state.error = false;
      state.planets = [];
      state.planet = undefined;
    },
  },
});

const { actions, reducer } = peopleSlice;

// Actions
export const fetchPlanets =
  (
    page: number,
    append = false,
    search = ""
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, state) => {
    dispatch(actions.requestBegin());
    try {
      const result = await swapi.fetchPlanets(page, search);
      if (append) {
        dispatch(
          actions.setPlanets([...state().planets.planets, ...result.results])
        );
      } else {
        dispatch(actions.setCount(result.count));
        dispatch(actions.setPlanets(result.results));
      }
      dispatch(actions.requestSuccess());
    } catch (e) {
      dispatch(actions.requestError());
    }
  };

export const fetchPlanet =
  (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.requestBegin());
    try {
      const result = await swapi.fetchPlanet(id);
      dispatch(actions.setPlanet(result));
      dispatch(actions.requestSuccess());
    } catch (e) {
      dispatch(actions.requestError());
    }
  };

export const { setPlanet, setPlanets, resetReducer } = actions;

export default reducer;
