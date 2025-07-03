import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../utils/localStorage";

interface Profile {
  name: string;
  email: string;
  age?: number;
}

interface ProfileState {
  data: Profile | null;
}

const initialState: ProfileState = {
  data: loadFromLocalStorage(),
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
    clearProfile: (state) => {
      state.data = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
