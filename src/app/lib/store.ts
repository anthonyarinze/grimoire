import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authslice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
    },
  });
};

// infer type of makestore
export type AppStore = ReturnType<typeof makeStore>;
// infer `rootstate` and `appdispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
