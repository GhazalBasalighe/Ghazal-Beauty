import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/auth";

export async function authenticateAdmin(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });

    if (response.status === 200) {
      return true; // Authentication successful
    } else {
      return false; // Authentication failed
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return false;
  }
}
