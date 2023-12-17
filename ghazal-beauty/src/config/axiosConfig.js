// import { jwtDecode } from "jwt-decode";
// import { setAccessToken } from "../store/slices/authSlice";
// import { store } from "../store/store";

// export const requestInterceptor = (req) => {
//   const state = store.getState();
//   const accessToken = state.auth.accessToken;
//   if (accessToken) {
//     const expiry = jwtDecode(accessToken).exp * 1000;
//     const isExpired = Date.now() - expiry > 0;
//     if (!isExpired) {
//       api.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${accessToken}`;
//     } else {
//     }
//   }

//   return req;
// };

// export const errorInterceptor = async (error) => {
//   const originalRequest = error.config;
//   const refreshToken = Cookies.get("refreshToken");
//   if (error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     try {
//       const response = await api.post("/auth/token", { refreshToken });

//       if (response.status === 200) {
//         const newAccessToken = response.data.token.accessToken;
//         store.dispatch(setAccessToken(newAccessToken));
//         api.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       }
//     } catch (refreshError) {
//       store.dispatch(logout());
//       return Promise.reject(refreshError);
//     }
//   }
//   return Promise.reject(error);
// };
