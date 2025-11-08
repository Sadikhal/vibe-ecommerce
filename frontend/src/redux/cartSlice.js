import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../lib/apiRequest";
import toast from "react-hot-toast";

export const fetchCart = createAsyncThunk("cart/fetch", async (_, { rejectWithValue }) => {
  try {
    const res = await apiRequest.get("/cart");
    return res.data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || "Failed to fetch cart");
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, qty = 1 }, { rejectWithValue }) => {
    try {
      const res = await apiRequest.post("/cart", { productId, qty });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to add to cart");
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ id, qty }, { rejectWithValue }) => {
    try {
      const res = await apiRequest.put(`/cart/${id}`, { qty });
      return res.data; // { items, total }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to update item");
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiRequest.delete(`/cart/${id}`);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Failed to remove item");
    }
  }
);

const mapItem = (item) => ({
  id: item._id,
  productId: item.product?._id,
  title: item.product?.title,
  price: item.product?.price,
  image: item.product?.image,
  quantity: item.qty,
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState(state) {
      state.items = [];
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = (action.payload?.items || []).map(mapItem);
        state.total = Number(action.payload?.total || 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload)
      })

      // add
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = (action.payload?.items || []).map(mapItem);
        state.total = Number(action.payload?.total || 0);
        toast.success("Item added to cart")
      })

      // update
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = (action.payload?.items || []).map(mapItem);
        state.total = Number(action.payload?.total || 0);
        toast.success("Item updated from cart")
      })

      // remove
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = (action.payload?.items || []).map(mapItem);
        state.total = Number(action.payload?.total || 0);
        toast.success("Item removed from cart")
      });
  },
});

export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
