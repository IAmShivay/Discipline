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
      // Ensure error.message exists and return it properly
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      return rejectWithValue(errorMessage);
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