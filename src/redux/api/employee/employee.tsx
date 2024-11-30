import axiosBackend from "../axiosBackend";
import { Employee } from "../../../components/employees/EmployeeForm";

export const createEmployee = async (employee: Employee) => {
  try {
    const response = await axiosBackend.post("/employees", employee);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
export const getEmployee = async () => {
  try {
    const response = await axiosBackend.get("/employees/getemployee"); // Use the instance directly
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
    // console.error("Axios error:", error.message);
    throw error.message;
  }
}