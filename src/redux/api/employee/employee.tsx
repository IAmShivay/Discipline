import axiosBackend from "../axiosBackend";
import { Employee } from "../../../components/employees/EmployeeForm";

export const createEmployee = async (employee: Employee) => {
  try {
    const response = await axiosBackend.post("/employees", employee);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getEmployee = async () => {
  try {
    const response = await axiosBackend.get("/employees/getemployee"); // Use the instance directly
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
