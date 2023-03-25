import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./reducers/exerciseSlice.js";

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export default store;