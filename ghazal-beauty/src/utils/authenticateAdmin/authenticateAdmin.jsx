import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8000/api/auth";

export async function authenticateAdmin(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      Cookies.set("accessToken", response.data.token.accessToken);
      Cookies.set("refreshToken", response.data.token.refreshToken);
      return true; // Authentication successful
    } else {
      return false; // Authentication failed
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return false;
  }
}
