import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./reducers/exerciseSlice.js";
import workoutSlice from "./reducers/workoutSlice.js";

const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    workouts: workoutSlice.reducer,
  },
});

export default store;