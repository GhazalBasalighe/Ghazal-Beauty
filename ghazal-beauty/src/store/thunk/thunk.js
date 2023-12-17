import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
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
