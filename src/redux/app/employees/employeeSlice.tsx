import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Employee } from '../../../components/employees/EmployeeForm'; // Assuming types are in a separate file
import axiosBackend from '../../api/axiosBackend';
import { getEmployee } from '../../api/employee/employee';

// Define the initial state interface
interface EmployeeState {
  employees: Employee[];
  currentEmployee: Employee | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: EmployeeState = {
  employees: [],
  currentEmployee: null,
  loading: 'idle',
  error: null
};

// Async thunk for creating an employee
export const createEmployee = createAsyncThunk(
  'employees/createEmployee',
  async (employeeData: Employee, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.post('/employees', employeeData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Failed to create employee');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Async thunk for updating an employee
export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, employeeData }: { id: any, employeeData: Partial<Employee> }, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.put(`/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Failed to update employee');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Async thunk for fetching employees
export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getEmployee();
      console.log(response);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Failed to fetch employees');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

// Create the slice
const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Additional synchronous reducers if needed
    clearCurrentEmployee: (state) => {
      state.currentEmployee = null;
    }
  },
  extraReducers: (builder) => {
    // Handling create employee
    builder.addCase(createEmployee.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.employees.push(action.payload);
      state.currentEmployee = action.payload;
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    // Handling update employee
    builder.addCase(updateEmployee.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      const index = state.employees.findIndex(emp => emp._id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
      state.currentEmployee = action.payload;
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });

    // Handling fetch employees
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.employees = action.payload;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  }
});

// Export actions and reducer
export const { clearCurrentEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;