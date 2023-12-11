import axios from "axios";
import Cookies from "js-cookie";
import { setAccessToken } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const API_BASE_URL = "http://localhost:8000/api/auth";

export async function authenticateAdmin(username, password) {
  const dispatch = useDispatch();
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      const accessToken = response.data.token.accessToken;
      const refreshToken = response.data.token.refreshToken;
      // set access token in redux
      dispatch(setAccessToken(accessToken));
      //set refresh token in cookies(they're http only by default)
      Cookies.set("refreshToken", refreshToken, {
        expires: 7,
        secure: true,
      });
      return true; // Authentication successful
    } else {
      return false; // Authentication failed
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return false;
  }
}
