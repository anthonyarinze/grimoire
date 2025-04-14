import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types";

// returns either userstaet or null if no ones logged in yet
const initialState: UserState | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // @ts-expect-error got no clue why this fails
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
