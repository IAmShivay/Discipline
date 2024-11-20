// src/axiosInstance.ts
import axios from 'axios';
const axiosBackend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Adjust the base URL as needed
});

// Function to set the authorization header
const setAuthHeader = (token: string) => {
    axiosBackend.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Retrieve token from local storage and set the header if present
const token = localStorage.getItem('token');
if (token) {
  setAuthHeader(token);
}

export { setAuthHeader };
export default axiosBackend;