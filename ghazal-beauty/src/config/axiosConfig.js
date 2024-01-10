import axios from "axios";
import { store } from "../store/store";
import { setAccessToken } from "../store/slices/authSlice";
import Cookies from "js-cookie";

const baseURL = "http://localhost:8000/api";

const api = axios.create({
  baseURL,
});
api.interceptors.request.use(
  (req) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = Cookies.get("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await api.post("/auth/token", { refreshToken });

        if (response.status === 200) {
          const newAccessToken = response.data.token.accessToken;
          store.dispatch(setAccessToken(newAccessToken));
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
