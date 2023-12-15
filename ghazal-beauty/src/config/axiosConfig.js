import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { sendRefreshToken } from "../store/thunk/thunk";
import { setAccessToken } from "../store/slices/authSlice";
import api from "./axiosInstance";
import axios from "axios";

// TRIGGERED BEFORE EACH REQUEST BEING SENT
api.interceptors.request.use(
  async (req) => {
    console.log("Request Interceptor - Request Config:", req);
    const dispatch = useDispatch();
    console.log("salaaaam");
    //get access token from redux store
    const accessToken = useSelector((state) => state.auth.accessToken);
    const expiry = jwtDecode(accessToken).exp * 1000;
    // const isExpired = Date.now() - expiry > 0;
    const isExpired = true;

    //ONLY RUNS WHEN THE ACCESS TOKEN IS NOT EXPIRED
    if (accessToken && !isExpired) {
      //set the access token for the header of all requests of this api
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    } else {
      //try to get a new refresh token
      dispatch(sendRefreshToken());
    }

    return req;
  },
  (error) => {
    console.error("Request Interceptor - Error:", error);
    return Promise.reject(error);
  }
);

// TRIGGERED AFTER EACH RESPONSE IS RECEIVED
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
          dispatch(setAccessToken(newAccessToken));
          originalRequest.headers[
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
