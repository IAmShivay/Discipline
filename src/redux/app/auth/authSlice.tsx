import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  Login,
  Register,
  Logout,
  // forgotPassword,
  resetPassword,
  // changePassword
} from "../../api/auth/auth";

import {
  getToken,
  clearToken,
  saveToken,
} from "../../../utility/tokenHandeling";
import { RootState } from "../../../store";
import axiosInstance from "../../api/axiosInstance";
interface AuthState {
  user: string | "";
  token: string | "";
  isLoading: boolean;
  error: string | "";
  isAuthenticated: boolean;
  role: string | "";
}

const initialState: AuthState = {
  user: "",
  token: getToken(),
  isLoading: false,
  error: "",
  isAuthenticated: !!getToken(),
  role: "",
};

interface Credentials {
  fullName: string;
  companyName: string;
  email: string;
  password?: string;
  mobileNumber: string;
  terms: boolean | undefined;
}

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await Logout(); // Assume this function handles server-side logout
      return null;
    } catch (error: any) {
      // thunkAPI.dispatch(showSnackbar({ message: "Logout failed", severity: "error" }));
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await Login(credentials);
      saveToken(data?.token);
      return data;
    } catch (error: any) {
      if (error.response) {
        return thunkAPI.rejectWithValue(
          error?.response?.data?.message || "Failed to fetch cases"
        );
      } else
        return thunkAPI.rejectWithValue(
          error?.message || "Failed to fetch cases"
        );
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials: Credentials, thunkAPI) => {
    try {
      const data = await Register(credentials);
      saveToken(data?.token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (profileData: any, thunkAPI) => {
    try {
      const response = await axiosInstance.put("/profile", profileData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const resetUserPassword = createAsyncThunk(
  "auth/resetUserPassword",
  async (
    resetData: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await axiosInstance.post("/change-password", resetData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const changeUserPassword = createAsyncThunk(
  "auth/changeUserPassword",
  async (
    passwordData: {
      token: string;
      currentPassword: string;
      newPassword: string;
    },
    thunkAPI
  ) => {
    try {
      const data = await axiosInstance.post("/reset-password", passwordData);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendPasswordResetLink = createAsyncThunk(
  "auth/sendPasswordResetLink",
  async (email: string, thunkAPI) => {
    try {
      const data = await resetPassword(email);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = "";
      state.token = "";
      state.isAuthenticated = false;
      state.role = "";
      clearToken();
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: any; token: string; role: string }>
        ) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.role = action.payload.user.role; // Assuming role is part of the response
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: any; token: string; role: string }>
        ) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.role = action.payload.user.role; // Assuming role is part of the response
        }
      )
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = "";
        // state.token = null;
        state.isAuthenticated = false;
        state.role = "";
      })
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        // Update other relevant state properties
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(resetUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetUserPassword.fulfilled, (state) => {
        state.isLoading = false;
        // You might want to handle successful password reset (e.g., show a message)
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.isLoading = false;
        // You might want to handle successful password change (e.g., show a message)
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(sendPasswordResetLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendPasswordResetLink.fulfilled, (state) => {
        state.isLoading = false;
        // You might want to set a success message here
        // state.resetLinkSent = true;
      })
      .addCase(sendPasswordResetLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
