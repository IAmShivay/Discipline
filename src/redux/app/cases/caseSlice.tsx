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
}

// Initial state
const initialState: CaseState = {
  cases: [],
  currentCase: null,
  loading: "idle",
  error: null,
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
      await axiosBackend.delete(`/delete/cases/${id}`);
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
      console.log(caseData,"jijiji")
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
      }      const response = await axiosBackend.put(`/cases/update/${id}`, formData, {
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
      const response = await axiosBackend.get("/cases/get");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Failed to fetch cases");
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
        state.cases = state.cases.map(case_ => 
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
        state.cases = action.payload;
      })
      .addCase(fetchCases.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearCurrentCase } = caseSlice.actions;
export default caseSlice.reducer;
