// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import axiosBackend from '../../api/axiosBackend';
// import axiosInstance from '../../api/axiosInstance';

// interface Role {
//   _id: number | string;
//   name: string;
//   companyId?: string;
//   description: string;
//   permissions: string[];
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// interface RoleState {
//   role: Role[];
//   roles: Role[];
//   currentRole: Role | null;
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: RoleState = {
//   role:[],
//   roles: [],
//   currentRole: null,
//   loading: 'idle',
//   error: null,
// };

// export const fetchRoles = createAsyncThunk(
//   'roles/fetchRoles',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axiosBackend.get('/roles/roles');
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch roles');
//     }
//   }
// );

// export const createRole = createAsyncThunk(
//   'roles/createRole',
//   async (roleData: Omit<Role, '_id'>, { rejectWithValue }) => {
//     try {
//       const response = await axiosBackend.post('/roles', roleData);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to create role');
//     }
//   }
// );

// export const updateRole = createAsyncThunk(
//   'roles/updateRole',
//   async (roleData: Role, { rejectWithValue }) => {
//     try {
//       const response = await axiosBackend.put(`/roles/${roleData._id}`, roleData);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to update role');
//     }
//   }
// );

// export const deleteRole = createAsyncThunk(
//   'roles/deleteRole',
//   async (id: number, { rejectWithValue }) => {
//     try {
//       await axiosBackend.delete(`/roles/${id}`);
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to delete role');
//     }
//   }
// );
// export const fetchRolesByCompanyId = createAsyncThunk(
//   'roles/fetchRolesByCompanyId',
//   async (companyId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.get(`/getuser/${companyId}`);

//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch roles for company');
//     }
//   }
// );
// const roleSlice = createSlice({
//   name: 'roles',
//   initialState,
//   reducers: {
//     setCurrentRole: (state, action: PayloadAction<Role | null>) => {
//       state.currentRole = action.payload;
//     },
//     clearRoleError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchRoles.pending, (state) => {
//         state.loading = 'pending';
//       })
//       .addCase(fetchRoles.fulfilled, (state, action) => {
//         state.loading = 'succeeded';
//         state.roles = action.payload;
//       })
//       .addCase(fetchRoles.rejected, (state, action) => {
//         state.loading = 'failed';
//         state.error = action.payload as string;
//       })
//       .addCase(createRole.fulfilled, (state, action) => {
//         state.roles.push(action.payload);
//       })
//       .addCase(updateRole.fulfilled, (state, action) => {
//         const index = state.roles.findIndex(role => role._id === action.payload.id);
//         if (index !== -1) {
//           state.roles[index] = action.payload;
//         }
//       })
//       .addCase(deleteRole.fulfilled, (state, action) => {
//         state.roles = state.roles?.filter(role => role._id !== action.payload);
//       })
//       .addCase(fetchRolesByCompanyId.pending, (state) => {
//         state.loading = 'pending';
//       })
//       .addCase(fetchRolesByCompanyId.fulfilled, (state, action) => {
//         state.loading = 'succeeded';
//         state.role = action.payload;
//       })
//       .addCase(fetchRolesByCompanyId.rejected, (state, action) => {
//         state.loading = 'failed';
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setCurrentRole, clearRoleError } = roleSlice.actions;

// export default roleSlice.reducer;



import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosBackend from '../../api/axiosBackend';
import axiosInstance from '../../api/axiosInstance';

// Role Interface
interface Role {
  _id: number | string;
  name: string;
  companyId?: string;
  description: string;
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// State Interface
interface RoleState {
  role: Role[];
  roles: Role[];
  currentRole: Role | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial State
const initialState: RoleState = {
  role: [],
  roles: [],
  currentRole: null,
  loading: 'idle',
  error: null,
};

// Async Thunks
export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.get('/roles/roles');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch roles');
    }
  }
);

export const createRole = createAsyncThunk(
  'roles/createRole',
  async (roleData: Omit<Role, '_id'>, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.post('/roles', roleData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to create role');
    }
  }
);

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async (roleData: Role, { rejectWithValue }) => {
    try {
      const response = await axiosBackend.put(`/roles/${roleData._id}`, roleData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to update role');
    }
  }
);

export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async (id: number | string, { rejectWithValue }) => {
    try {
      await axiosBackend.delete(`/roles/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete role');
    }
  }
);

export const fetchRolesByCompanyId = createAsyncThunk(
  'roles/fetchRolesByCompanyId',
  async (companyId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/getuser/${companyId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch roles for company');
    }
  }
);

// Role Slice
const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    setCurrentRole: (state, action: PayloadAction<Role | null>) => {
      state.currentRole = action.payload;
    },
    clearRoleError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.roles = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })

      // Create Role
      .addCase(createRole.fulfilled, (state, action) => {
        if (Array.isArray(state.roles)) {
          state.roles.push(action.payload);
        } else {
          state.roles = [action.payload];
        }
      })

      // Update Role
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = (state.roles || []).findIndex(role => role._id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })

      // Delete Role
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = (state.roles || []).filter(role => role._id !== action.payload);
      })

      // Fetch Roles by Company ID
      .addCase(fetchRolesByCompanyId.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchRolesByCompanyId.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.role = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRolesByCompanyId.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export Actions and Reducer
export const { setCurrentRole, clearRoleError } = roleSlice.actions;

export default roleSlice.reducer;