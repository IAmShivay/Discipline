// import axios from "axios";

import axiosBackend from "../axiosBackend";
import { Category } from "../../app/categories/categorieSlice";
export const createCategories = async (Data: Category) => {
  try {
    const response = await axiosBackend.post("/catagories/create", Data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosBackend.get("/catagories/get"); // Typo in the endpoint
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
