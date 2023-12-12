import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8000/api/auth";

export const authenticateAdmin = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      const accessToken = response.data.token.accessToken;
      const refreshToken = response.data.token.refreshToken;
      // set access token in redux
      // set refresh token in cookies (they're http-only by default)
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
};
