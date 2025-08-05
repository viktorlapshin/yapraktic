import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { checkResponse } from "../../utils/api";
import { RootState } from "../types";

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
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
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        rejectWithValue("Ошибка создания заказа");
      }
    }
  }
);

interface OrderState {
  orderNumber: number | null
  loading: boolean
  error: string | null
}

const initialState: OrderState = {
    orderNumber: null,
    loading: false,
    error: null,
}

const orderSlice = createSlice({
  name: "order",
  initialState,
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
        state.error = action.error.message ?? null
      });
  },
});

export const orderNumberSelector = (state: RootState) => state.order.orderNumber
export const isLoadingOrderSelector = (state: RootState) => state.order.loading
export const errorOrderSelector = (state: RootState) => state.order.error

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
