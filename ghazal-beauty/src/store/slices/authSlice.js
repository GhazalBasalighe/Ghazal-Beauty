import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    checkTokenExpiration: (state) => {},
    getRefreshToken: (state) => {},
  },
});

export const { setAccessToken, checkTokenExpiration, getRefreshToken } =
  authSlice.actions;
export default authSlice.reducer;
