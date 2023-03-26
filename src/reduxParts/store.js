import { configureStore } from "@reduxjs/toolkit";
import exerciseReducer from "./reducers/exerciseSlice.js";
import workoutReducer from "./reducers/workoutSlice.js";

const store = configureStore({
  reducer: {
    exercises: exerciseReducer,
    workouts:workoutReducer
  },
});

export default store;