import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Ошибка при оформлении заказа");
      }

      return data.order.number; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderNumber = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderNumber = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
