import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../lib/apiRequest";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await apiRequest.get("/product", { params });
      return res.data.products || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
    lastQuery: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
