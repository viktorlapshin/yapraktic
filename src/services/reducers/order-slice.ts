import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { checkResponse } from "../../utils/api";
import { type RootState } from "../types";
import { Order, OrderWithIngredients } from "./orders-all/types";
import { ordersAllResponseSelector } from "./orders-all/slice";
import { ordersResponseSelector } from "./orders/slice";
import { ingredientsMapSelector } from "./ingredients-slice";

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });

export const sendOrder = createAsyncThunk<number, string[]>(
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
        return rejectWithValue("Ошибка создания заказа");
      }
    }
  }
);

export const getOrder = createAsyncThunk<Order | null, number>(
  "order/getOrder",
  async (orderNumber, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await checkResponse(response);

      return data.orders?.[0] ?? null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Ошибка создания заказа");
      }
    }
  }
);

// export const sendOrder = createAsyncThunk(
//   "order/sendOrder",
//   async (ingredientIds, { rejectWithValue }) => {
//     try {
//       const [response] = await Promise.all([
//         fetch(`${BASE_URL}/orders`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ ingredients: ingredientIds }),
//         }),
//         sleep(15_000),
//       ]);

//       const data = await checkResponse(response);

//       return data.order.number;
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       } else {
//         rejectWithValue("Ошибка создания заказа");
//       }
//     }
//   }
// );

export interface OrderState {
  orderNumber: number | null;
  loading: boolean;
  error: string | null;

  selectedOrder: Order | null;
}

export const initialState: OrderState = {
  orderNumber: null,
  loading: false,
  error: null,

  selectedOrder: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
      state.error = null;
      state.loading = false;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
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
        state.error = action.error.message ?? null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      });
  },
});

export const orderNumberSelector = (state: RootState) =>
  state.order.orderNumber;
export const isLoadingOrderSelector = (state: RootState) => state.order.loading;
export const errorOrderSelector = (state: RootState) => state.order.error;
export const orderSelector = (state: RootState) => state.order.selectedOrder;
export const totalOrderSelector = (orderNumber: number) =>
  createSelector(
    orderSelector,
    ordersAllResponseSelector,
    ordersResponseSelector,
    (order, ordersAllResponse, ordersResponse) => {
      if (order) {
        return order;
      }

      const orderFromAll = ordersAllResponse?.orders.find(
        (order) => order.number === orderNumber
      );

      if (orderFromAll) {
        return orderFromAll;
      }

      const orderFromProfile = ordersResponse?.orders.find(
        (order) => order.number === orderNumber
      );

      if (orderFromProfile) {
        return orderFromProfile;
      }

      return null;
    }
  );

export const totalOrderWithIngridientsSelector = (orderNumber: number) =>
  createSelector(
    totalOrderSelector(orderNumber),
    ingredientsMapSelector,
    (order, ingredientsMap): OrderWithIngredients | null => {
      if (order) {
        return {
          ...order,
          ingredients: order.ingredients.map(
            (ingredientId) => ingredientsMap[ingredientId]
          ),
        };
      }

      return null;
    }
  );

export const { clearOrder, clearSelectedOrder } = orderSlice.actions;

export default orderSlice.reducer;
