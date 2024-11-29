// import axios from "axios";

import axiosBackend from "../axiosBackend";
import { Category } from "../../app/categories/categorieSlice";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../app/error/errorSlice";
export const createCategories = async (Data: Category) => {
  try {
    const response = await axiosBackend.post("/catagories/create", Data);
    return response.data;
  } catch (error) {
    console.log(error);
    handleAxiosError(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosBackend.get("/catagories/get"); // Typo in the endpoint
    return response.data;
  } catch (error) {
    console.log(error);
    handleAxiosError(error);
  }
};

function handleAxiosError(error: any) {
  const dispatch = useDispatch();
  if (error.response) {
    const errorMessage = error.response.data.message;
    console.log(errorMessage);
    dispatch(showSnackbar({ message: errorMessage, severity: "error" }));
  } else {
    throw error.message;
  }
}
