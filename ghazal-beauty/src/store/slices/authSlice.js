import { createSlice } from "@reduxjs/toolkit";
import { loginUser, sendRefreshToken } from "../thunk/thunk";
import Cookies from "js-cookie";

const initialState = {
  accessToken: "",
  isLoggedIn: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (state.accessToken = ""), (state.isLoggedIn = false);
      Cookies.remove("refreshToken");
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    // BUILDERS FOR LOGGING THE USER IN WITH ACCESS TOKEN
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === "success")
        state.accessToken = action.payload.token.accessToken;
      state.isLoggedIn = true;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.accessToken = "";
      state.isLoggedIn = false;
      state.isLoading = false;
    });
    // BUILDERS FOR KEEPING THE USER LOGGED IN WITH THE USE OF REFRESH TOKEN
    builder.addCase(sendRefreshToken.fulfilled, (state, action) => {
      if (action.payload.status === "success")
        state.accessToken = action.payload.token.accessToken;
      state.isLoading = false;
    });
    builder.addCase(sendRefreshToken.rejected, (state) => {
      state.accessToken = "";
      state.isLoggedIn = false;
      state.isLoading = false;
    });
  },
});

export const { logout, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
