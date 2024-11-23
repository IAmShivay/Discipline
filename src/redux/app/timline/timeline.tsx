// timelineSlice.tsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosBackend from "../../api/axiosBackend";

// Define the Timeline type
interface TimelineItem {
  _id: string;
  caseId: string;
  date: string;
  description: string;
  userId: string;
  event: string;
  createdAt: string;
  // Add other properties as needed
}

interface TimelineState {
  items: TimelineItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TimelineState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchCaseTimeline = createAsyncThunk(
  "timeline/fetchCaseTimeline",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.get(`/cases/timeline/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch timeline"
        );
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    clearTimeline: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCaseTimeline.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCaseTimeline.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCaseTimeline.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearTimeline } = timelineSlice.actions;

export default timelineSlice.reducer;
