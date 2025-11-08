// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../lib/apiRequest";
import toast from "react-hot-toast";
import { fetchCart } from "./cartSlice"; // to resync cart after checkout

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ name, email }, { rejectWithValue, dispatch }) => {
    try {
      const res = await apiRequest.post("/checkout", { name, email });
      // backend response expected shape:
      // { message, receipt: { orderId, total, timestamp, customer:{name,email}, items:[{product,qty,price}] } }
      // Refresh cart (backend clears it after checkout)
      dispatch(fetchCart());
      return res.data.receipt;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Checkout failed");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    receipt: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearReceipt(state) {
      state.receipt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.receipt = action.payload;
        toast.success("Order placed successfully!");
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearReceipt } = orderSlice.actions;
export default orderSlice.reducer;
