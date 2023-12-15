import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setAccessToken, logout } from "../slices/authSlice";
import api from "../../config/axiosInstance";
// LOGIN USER THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        const refreshToken = response.data.token.refreshToken;
        // set refresh token in cookies (they're http-only by default)
        Cookies.set("refreshToken", refreshToken, {
          expires: 7,
          secure: true,
          sameSite: "None",
        });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//REFRESH TOKEN THUNK
export const sendRefreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (_, thunkAPI) => {
    console.log("hi ! I am sendRefreshToken function running !");
    try {
      // request to refresh the access token using the refresh token
      const refreshToken = Cookies.get("refreshToken");

      //even no refresh token? log out the user!
      if (!refreshToken) {
        thunkAPI.dispatch(logout());
      }
      const response = await api.post("/auth/token", { refreshToken });

      if (response.status === 200) {
        const newAccessToken = response.data.token.accessToken;

        // Update the access token in the Redux store
        thunkAPI.dispatch(setAccessToken(newAccessToken));
      }

      // If the refresh token request is unsuccessful, consider the user as not logged in
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue("Refresh token request failed");
    } catch (error) {
      console.error("Error refreshing token:", error);
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue("Error refreshing token");
    }
  }
);
