import { createSlice, createSelector } from "@reduxjs/toolkit";
import { ordersOnMessage } from "./actions";
import { RootState } from "@/services/types";
import { ingredientsMapSelector } from "../ingredients-slice";
import { OrderResponse } from "../orders-all/types";
import { OrderWithIngredients } from "../orders-all/types";

export interface OrdersState {
  ordersResponse: OrderResponse | null;
}

const initialState: OrdersState = {
  ordersResponse: null,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(ordersOnMessage, (state, action) => {
      state.ordersResponse = action.payload;
    }),
});

export const ordersResponseSelector = (state: RootState) =>
  state.orders.ordersResponse;

export const ordersSelector = createSelector(
  ordersResponseSelector,
  ingredientsMapSelector,
  (ordersResponse, ingredientsMap) => {
    if (ordersResponse) {
      return ordersResponse.orders.map<OrderWithIngredients>((order) => ({
        ...order,
        ingredients: order.ingredients.map(
          (ingredientId) => ingredientsMap[ingredientId]
        ),
      }));
    }

    return [];
  }
);
