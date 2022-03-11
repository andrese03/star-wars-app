import { configureStore } from "@reduxjs/toolkit";
import people from "./slices/people";
import planets from "./slices/planets";
import films from "./slices/films";

export const store = configureStore({
  reducer: {
    people,
    planets,
    films,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
