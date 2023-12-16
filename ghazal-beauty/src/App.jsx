import "./App.css";
import { RouterProvider } from "react-router-dom";
import React, { Suspense, useCallback } from "react";
import { router } from "./routes/routes";
import { SyncLoader } from "react-spinners";

import api from "./config/axiosInstance";
import { store } from "./store/store";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { setAccessToken } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  api.interceptors.request.use(
    async (req) => {
      const state = store.getState();
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        const expiry = jwtDecode(accessToken).exp * 1000;
        const isExpired = Date.now() - expiry > 0;
        if (!isExpired) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        } else {
        }
      }

      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => {
      //just return the response for god's sake
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = Cookies.get("refreshToken");
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await api.post("/auth/token", { refreshToken });

          if (response.status === 200) {
            const newAccessToken = response.data.token.accessToken;
            console.log(newAccessToken);
            dispatch(setAccessToken(newAccessToken));
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <Suspense
      fallback={
        <SyncLoader color="#a056b9" className="fixed top-1/2 left-1/2" />
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
