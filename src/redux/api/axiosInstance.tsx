// src/axiosInstance.ts
import axios from "axios";
import { getToken } from "../../utility/tokenHandeling";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Adjust the base URL as needed
});

// Function to set the authorization header
const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Retrieve token from local storage and set the header if present
const token = getToken();
if (token) {
  setAuthHeader(token);
}

export { setAuthHeader };
export default axiosInstance;
