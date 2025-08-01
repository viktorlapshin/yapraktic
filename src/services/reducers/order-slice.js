import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { checkResponse } from "../../utils/api";

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const [response] = await Promise.all([
        fetch(`${BASE_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients: ingredientIds }),
        }),
        sleep(15_000),
      ]);

      const data = await checkResponse(response);

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

export const orderNumberSelector = (state) => state.order.orderNumber
export const isLoadingOrderSelector = (state) => state.order.loading
export const errorOrderSelector = (state) => state.order.error

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
