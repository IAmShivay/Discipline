import axiosBackend from "../axiosBackend";
import { Employee } from "../../../components/employees/EmployeeForm";
import axios from "axios";






export const createEmployee = async (employee: Employee) => {
  try {
    const response = await axiosBackend.post("/employees", employee);
    return response.data;
  } catch (error) {
    console.log(error);
    handleAxiosError(error);
  }
};
export const getEmployee = async () => {
  try {
    const response = await axiosBackend.get("/employees/getemployee"); // Use the instance directly
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error); // Ensure you have a proper error handling function
  }
};

function handleAxiosError(error: any) {
  if (error.response) {
    const errorMessage = error.response.data.message;
    console.log(errorMessage);
    throw errorMessage;
  } else {
    console.error("Axios error:", error.message);
    throw error.message;
  }
}