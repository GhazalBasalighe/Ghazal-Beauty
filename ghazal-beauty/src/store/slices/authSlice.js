import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunk/thunk";
import Cookies from "js-cookie";

const initialState = {
  accessToken: "",
  isLoggedIn: false,
  isLoading: false,
  productUpdateSignal: false,
  userName: "",
  userId: "",
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setProductUpdateSignal: (state, action) => {
      state.productUpdateSignal = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
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
      state.userId = action.payload.data.user._id;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.accessToken = "";
      state.isLoggedIn = false;
      state.isLoading = false;
    });
  },
});

export const {
  logout,
  setAccessToken,
  setIsLoading,
  setProductUpdateSignal,
  setUserName,
} = authSlice.actions;
export default authSlice.reducer;
