import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types";

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState | null>) {
      if (action.payload) {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
        state.photoURL = action.payload.photoURL;
      } else {
        // clear state if payload is null
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
      }
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
