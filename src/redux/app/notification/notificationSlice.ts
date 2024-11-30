import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBackend from "../../api/axiosBackend";

// Define the Notification type
interface Notification {
  _id: string;
  type: string;
  title: string;
  caseId: string;
  employeeId: string;
  userId: string;
  companyId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  // Add other fields as needed
}

// Define the state interface
interface NotificationState {
  notifications: Notification[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: NotificationState = {
  notifications: [],
  loading: "idle",
  error: null,
};

// Async thunk for fetching notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.get("/cases/notifications");
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
export const updateNotificationStatus = createAsyncThunk(
  "notifications/updateStatus",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.patch(
        `/cases/update-notifications/${notificationId}`,
        {
          isRead: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
// Create the slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload
      );
      if (notification) {
        notification.isRead = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.notifications = action.payload.data;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateNotificationStatus.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const updatedNotification = action.payload;
        const index = state.notifications.findIndex(
          (n) => n._id === updatedNotification.id
        );
        if (index !== -1) {
          state.notifications[index] = updatedNotification;
        }
      })
      .addCase(updateNotificationStatus.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { markAsRead, clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
