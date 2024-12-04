import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Employee } from "../../../components/employees/EmployeeForm"; // Assuming types are in a separate file
import axiosBackend from "../../api/axiosBackend";
import { getEmployee } from "../../api/employee/employee";

// Define the initial state interface
interface EmployeeState {
  employees: Employee[];
  currentEmployee: Employee | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: EmployeeState = {
  employees: [],
  currentEmployee: null,
  loading: "idle",
  error: null,
};

// Async thunk for creating an employee
export const createEmployee = createAsyncThunk(
  "employees/createEmployee",
  async (employeeData: Employee, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.post("/employees", employeeData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch cases");
    }
  }
);

// Async thunk for deleting an employee
export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosBackend.delete(`/employees/${id}`);
      return id; // Return the id of the deleted employee
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch cases");
    }
  }
);

// Async thunk for updating an employee
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async (
    { id, employeeData }: { id: any; employeeData: Partial<Employee> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosBackend.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch cases");
    }
  }
);

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployee();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.message || "Failed to fetch cases");
    }
  }
);
// Create the slice
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
    },
  },
  extraReducers: (builder) => {
    // Handling create employee
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        // Ensure employees is an array before pushing
        state.employees = Array.isArray(state.employees)
          ? [...state.employees, action.payload]
          : [action.payload];
        state.currentEmployee = action.payload;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    // Handling delete employee
    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        // Ensure employees is an array before filtering
        state.employees = (state.employees || []).filter(
          (employee) => employee._id !== action.payload
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    // Handling update employee
    builder
      .addCase(updateEmployee.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = "succeeded";
        // Ensure employees is an array before finding index
        const employees = state.employees || [];
        const index = employees.findIndex(
          (emp) => emp._id === action.payload.id
        );

        if (index !== -1) {
          // Create a new array to trigger immutable update
          const updatedEmployees = [...employees];
          updatedEmployees[index] = action.payload;
          state.employees = updatedEmployees;
        }
        state.currentEmployee = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });

    // Handling fetch employees
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = "succeeded";
        // Ensure the payload is an array
        state.employees = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearCurrentEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
