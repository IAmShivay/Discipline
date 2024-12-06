// import axios from "axios";
import { clearToken } from "../../../utility/tokenHandeling";
import axiosInstance from "../axiosInstance";
import axios from "axios";
interface Credentials {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  permission?: [string];
  role?: string;
  status?: string;
}

export const Register = async (credentials: Credentials) => {
  try {
    const response = await axiosInstance.post("/signup", credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const Login = async (credentials: Credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const Logout = async () => {
  try {
    const response = await axios.get("/api/v1/logout");
    if (response.status === 200) {
      clearToken();
      setTimeout(() => {
        window.location.href = "/user/login";
      }, 2000);
    }
  } catch (error) {
    return "An error occurred during logout";
  }
};
// src/verify.ts

export const Verify = async () => {
  try {
    const response = await axiosInstance.get("/verify"); // Use the instance directly
    return response.data;
  } catch (error) {
    handleAxiosError(error); // Ensure you have a proper error handling function
  }
};

function handleAxiosError(error: any) {
  if (error.response) {
    const errorMessage = error.response.data.message;
    throw errorMessage;
  } else {
    throw error.message;
  }
}
