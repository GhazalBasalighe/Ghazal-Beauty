import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

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

export const useRefreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (data, thunkAPI) => {}
);
