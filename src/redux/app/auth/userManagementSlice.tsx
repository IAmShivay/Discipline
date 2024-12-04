import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  permissions: string[];
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users");
      return response.data;
    } catch (error) {
      //   return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async (userData: Omit<User, "_id">, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/add-user", userData);
      return response.data;
    } catch (error) {
      //   return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/users/${userData._id}`, userData);
      return response.data;
    } catch (error) {
      //   return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      return userId;
    } catch (error) {
      //   return rejectWithValue(error.response.data);
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "users/changeStatus",
  async (
    { userId, status }: { userId: string; status: "active" | "inactive" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(`/api/users/${userId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      //   return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index].status = action.payload.status;
        }
      });
  },
});

export const { setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
