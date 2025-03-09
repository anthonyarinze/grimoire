import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authslice";
import userReducer from "./slices/userslice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      search: searchReducer,
      user: userReducer,
    },
  });
};

// infer type of makestore
export type AppStore = ReturnType<typeof makeStore>;
// infer `rootstate` and `appdispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
