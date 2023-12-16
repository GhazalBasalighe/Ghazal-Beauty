import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setAccessToken, logout } from "../slices/authSlice";
import api from "../../config/axiosInstance";
import { store } from "../store";
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
    try {
      const refreshToken = Cookies.get("refreshToken");
      console.log(refreshToken);
      const response = await api.post("/auth/token", { refreshToken });
      if (response.status === 200) {
        const newAccessToken = response.data.token.accessToken;
        store.dispatch(setAccessToken(newAccessToken));
      }

      // If the refresh token request is unsuccessful, consider the user as not logged in
      store.dispatch(logout());
      return thunkAPI.rejectWithValue("Refresh token request failed");
    } catch (error) {
      console.error("Error refreshing token:", error);
      store.dispatch(logout());
      return thunkAPI.rejectWithValue("Error refreshing token");
    }
  }
);
