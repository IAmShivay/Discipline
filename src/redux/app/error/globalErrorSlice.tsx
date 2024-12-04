// src/store/errorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: { message: null },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload; // Store the error message
    },
    clearError: (state) => {
      state.message = null; // Clear the error
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
