import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types";

const initialState: UserState = {
  uid: null,
  email: null,
  displayName: null,
  photoUrl: null,
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
        state.photoUrl = action.payload.photoUrl;
      } else {
        // clear state if payload is null
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoUrl = null;
      }
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
