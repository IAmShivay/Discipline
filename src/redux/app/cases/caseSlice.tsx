import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DisciplinaryCase } from "../../../types"; // Adjust the import path as needed
import axiosBackend from "../../api/axiosBackend";

// Define the initial state interface
interface CaseState {
  cases: DisciplinaryCase[];
  currentCase: DisciplinaryCase | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  employeeResponses: any[]; // Update this type as needed
  adminResponses: any[];
}

// Initial state
const initialState: CaseState = {
  cases: [],
  currentCase: null,
  loading: "idle",
  error: null,
  employeeResponses: [],
  adminResponses: [],
};

// Async thunk for creating a case
export const createCase = createAsyncThunk(
  "cases/createCase",
  async (caseData: DisciplinaryCase, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Add all case data to the FormData object
      Object.keys(caseData).forEach((key) => {
        if (key === "attachments" && Array.isArray(caseData.attachments)) {
          // Handle file attachments
          caseData.attachments.forEach((file, index) => {
            formData.append(`attachments`, file);
          });
        } else {
          formData.append(key, (caseData as any)[key]);
        }
      });

      const response = await axiosBackend.post("/cases/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to create case");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Async thunk for deleting a case
export const deleteCase = createAsyncThunk(
  "cases/deleteCase",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosBackend.delete(`/cases/delete/${id}`);
      return id; // Return the id of the deleted case
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to delete case");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Async thunk for updating a case
export const updateCase = createAsyncThunk(
  "cases/updateCase",
  async (
    { id, caseData }: { id: string; caseData: Partial<DisciplinaryCase> },
    { rejectWithValue }
  ) => {
    try {
      console.log(caseData, "jijiji");
      const formData = new FormData();

      // Add all case data to the FormData object
      Object.keys(caseData).forEach((key) => {
        if (key === "attachments" && Array.isArray(caseData.attachments)) {
          // Handle file attachments
          caseData.attachments.forEach((file, index) => {
            formData.append(`attachments`, file);
          });
        } else {
          formData.append(key, (caseData as any)[key]);
        }
      });
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await axiosBackend.put(`/cases/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to update case");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Async thunk for fetching cases
export const fetchCases = createAsyncThunk(
  "cases/fetchCases",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.get("/cases/employee");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch cases");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const fetchCaseById = createAsyncThunk(
  "cases/fetchCaseById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.get(`/cases/caseId/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch case");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Async thunk for adding an employee response
export const addEmployeeResponse = createAsyncThunk(
  "cases/addEmployeeResponse",
  async (
    {
      caseId,
      responseData,
    }: {
      caseId: string;
      responseData: { message: string; attachments?: File[] };
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("message", responseData.message);

      if (responseData.attachments) {
        responseData.attachments.forEach((file, index) => {
          formData.append(`attachments`, file);
        });
      }

      const response = await axiosBackend.post(
        `/cases/${caseId}/employee-response`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to add employee response"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Async thunk for adding an admin response
export const addAdminResponse = createAsyncThunk(
  "cases/addAdminResponse",
  async (
    {
      caseId,
      responseData,
    }: {
      caseId: string;
      responseData: { message: string; attachments?: File[] };
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("message", responseData.message);

      if (responseData.attachments && responseData.attachments.length > 0) {
        responseData.attachments.forEach((file, index) => {
          formData.append(`attachments`, file, file.name);
        });
      }

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axiosBackend.post(
        `/cases/${caseId}/admin-response`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error details:", error.response?.data);
        return rejectWithValue(
          error.response?.data || "Failed to add admin response"
        );
      }
      console.error("Unexpected error:", error);
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export const fetchEmployeeResponses = createAsyncThunk(
  "cases/fetchEmployeeResponses",
  async (caseId: string, { rejectWithValue }) => {
    console.log("Fetching employee responses for case:", caseId);
    try {
      const response = await axiosBackend.get(
        `/cases/employee-responses/${caseId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch employee responses"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
// Create the slice
const caseSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    clearCurrentCase: (state) => {
      state.currentCase = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle create case
      .addCase(createCase.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createCase.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.cases.push(action.payload);
        state.currentCase = action.payload;
      })
      .addCase(createCase.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      // Handle delete case
      .addCase(deleteCase.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.cases = state.cases.filter(
          (case_) => case_.id !== action.payload
        );
      })
      .addCase(deleteCase.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      // Handle update case
      .addCase(updateCase.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateCase.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.cases = state.cases.map((case_) =>
          case_.id === action.payload.id ? action.payload : case_
        );
        state.currentCase = action.payload;
      })
      .addCase(updateCase.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      // Handle fetch cases
      .addCase(fetchCases.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCases.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.cases = action.payload.data;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchCaseById.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCaseById.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currentCase = action.payload.data;
      })
      .addCase(fetchCaseById.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(addEmployeeResponse.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addEmployeeResponse.fulfilled, (state, action) => {
        state.loading = "succeeded";
        // If currentCase matches the updated one, update it with the new response
        if (
          state.currentCase &&
          state.currentCase.id === action.payload.caseId
        ) {
          state.currentCase.adminResponses = [
            ...(state.currentCase.adminResponses || []),
            action.payload,
          ];
        }
      })
      .addCase(addEmployeeResponse.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      // Handle admin response
      .addCase(addAdminResponse.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addAdminResponse.fulfilled, (state, action) => {
        state.loading = "succeeded";
        // If currentCase matches the updated one, update it with the new response
        if (
          state.currentCase &&
          state.currentCase.id === action.payload.caseId
        ) {
          state.currentCase.employeeResponse = [
            ...(state.currentCase.employeeResponse || []),
            action.payload,
          ];
        }
      })
      .addCase(addAdminResponse.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchEmployeeResponses.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchEmployeeResponses.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.employeeResponses = action.payload;
      })
      .addCase(fetchEmployeeResponses.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearCurrentCase } = caseSlice.actions;
export default caseSlice.reducer;
