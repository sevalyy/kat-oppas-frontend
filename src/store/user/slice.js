import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: localStorage.getItem("profile"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      console.log("Setting new user profile", action.payload.user);
      localStorage.setItem("profile", action.payload.user);
      state.profile = action.payload.user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      console.log("Setting user profile to null");
      localStorage.removeItem("profile");
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
      console.log("Updating user profile", action.payload.user);
    },
  },
});

export const { loginSuccess, logOut, tokenStillValid } = userSlice.actions;

export default userSlice.reducer;
