import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
    },
  });
};

// infer type of makestore
export type AppStore = ReturnType<typeof makeStore>;
// infer `rootstate` and `appdispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
