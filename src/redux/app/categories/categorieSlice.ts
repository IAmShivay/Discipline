import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createCategories, getCategories } from "../../api/categories/categoriesApi";
// Define the Category type
export interface Category {
  _id?: string;
  name: string;
  description: string;
  companyId?: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the state type
interface CategoriesState {
  items: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: CategoriesState = {
  items: [],
  status: "idle",
  error: null,
};

// Async thunks
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await getCategories();  ;
    return response;
  } catch (err) {
    return rejectWithValue("Failed to fetch categories");
  }
});

export const addCategory = createAsyncThunk<
  Category,      // Return type
  Partial<Category>, // Argument type (Partial because `_id` and timestamps are usually generated server-side)
  { rejectValue: string } // Error type
>("categories/addCategory", async (category, { rejectWithValue }) => {
  try {
    const response = await createCategories(category as Category);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as any)?.message);
    
  }
});

// export const updateCategory = createAsyncThunk<
//   Category,
//   Category,
//   { rejectValue: string }
// >("categories/updateCategory", async (category, { rejectWithValue }) => {
//   try {
//     const response = await api.put<Category>(
//       `/categories/${category._id}`,
//       category
//     );
//     return response.data;
//   } catch (err) {
//     return rejectWithValue("Failed to update category");
//   }
// });

// export const deleteCategory = createAsyncThunk<
//   number,
//   number,
//   { rejectValue: string }
// >("categories/deleteCategory", async (id, { rejectWithValue }) => {
//   try {
//     await api.delete(`/categories/${id}`);
//     return id;
//   } catch (err) {
//     return rejectWithValue("Failed to delete category");
//   }
// });

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error occurred";
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.items.push(action.payload);
        }
      )
      // .addCase(
      //   updateCategory.fulfilled,
      //   (state, action: PayloadAction<Category>) => {
      //     const index = state.items.findIndex(
      //       (cat) => cat._id === action.payload._id
      //     );
      //     if (index !== -1) {
      //       state.items[index] = action.payload;
      //     }
      //   }
      // )
      // .addCase(
      //   deleteCategory.fulfilled,
      //   (state, action: PayloadAction<number>) => {
      //     state.items = state.items.filter(
      //       (cat) => (cat._id as any) !== action.payload
      //     );
      //   }
      // );
  },
});

export default categoriesSlice.reducer;
