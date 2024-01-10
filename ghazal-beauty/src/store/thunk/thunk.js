import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../config/axiosConfig";
// LOGIN USER THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", data);
      if (response.status === 200) {
        const refreshToken = response.data.token.refreshToken;
        Cookies.set("refreshToken", refreshToken, {
          expires: 7,
          secure: true,
          sameSite: "None",
        });
      } else {
        return rejectWithValue({
          status: "failure",
          message: "Authentication failed",
        });
      }
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  }
);
