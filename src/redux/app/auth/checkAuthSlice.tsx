// src/slices/userSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Verify } from '../../api/auth/auth';

interface User {
  name: string;
  role: string;
  companyId: string;
  companyName: string;
  fullName: string;
  userId: string; // Adjust according to your user object structure
  // Add other fields as needed
}

interface UserState {
  isAuthenticated:boolean,
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuthenticated:false,
  user: null,
  loading: false,
  error: null,
};

export const loadUser = createAsyncThunk<any>(
  'user/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await Verify();
      return data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(
          error?.response?.data?.message || "Failed to fetch cases"
        );
      } else return rejectWithValue(error?.message || "Failed to fetch cases");
    }
  }
);

const verify = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      });
  },
});

export default verify.reducer;