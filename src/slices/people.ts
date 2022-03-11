import { createSlice, ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import * as swapi from "../services/swapi";
import { Person } from "../shared/interfaces";
import type { RootState } from "../store";

// Define a type for the slice state
interface PeopleState {
  loading: boolean;
  loadingPool: boolean[];
  error: boolean;
  people: Person[];
  count: number;
  person?: Person;
}

// Initial State
const initialState: PeopleState = {
  loading: false,
  loadingPool: [],
  error: false,
  people: [],
  count: 0,
  person: undefined,
};

export const peopleSlice = createSlice({
  name: "people",
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
    setPeople: (state, { payload }) => {
      state.people = payload;
    },
    setPerson: (state, { payload }) => {
      state.person = payload;
    },
    setCount: (state, { payload }) => {
      state.count = payload;
    },
    resetReducer: (state) => {
      state.loading = false;
      state.loadingPool = [];
      state.error = false;
      state.people = [];
      state.person = undefined;
    },
  },
});

const { actions, reducer } = peopleSlice;

// Actions
export const fetchPeople =
  (
    page: number,
    append = false,
    search = ""
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, state) => {
    dispatch(actions.requestBegin());
    try {
      const result = await swapi.fetchPeople(page, search);
      if (append) {
        dispatch(
          actions.setPeople([...state().people.people, ...result.results])
        );
      } else {
        dispatch(actions.setCount(result.count));
        dispatch(actions.setPeople(result.results));
      }
      dispatch(actions.requestSuccess());
    } catch (e) {
      dispatch(actions.requestError());
    }
  };

export const fetchPerson =
  (id: number): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch(actions.requestBegin());
    try {
      const result = await swapi.fetchPerson(id);
      dispatch(actions.setPerson(result));
      dispatch(actions.requestSuccess());
    } catch (e) {
      dispatch(actions.requestError());
    }
  };

export const { setPerson, setPeople, resetReducer } = actions;

export default reducer;
