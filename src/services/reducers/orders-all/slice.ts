import { createSlice, createSelector } from "@reduxjs/toolkit";
import { OrderResponse } from "./types";
import { ordersAllOnMessage } from "./actions";
import { RootState } from "@/services/types";
import { ingredientsMapSelector } from "../ingredients-slice";
import { OrderWithIngredients } from "./types";

export interface OrdersAllState {
  ordersResponse: OrderResponse | null;
}

const initialState: OrdersAllState = {
  ordersResponse: null,
};

export const ordersAllSlice = createSlice({
  name: "ordersAll",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(ordersAllOnMessage, (state, action) => {
      state.ordersResponse = action.payload;
    }),
});

export const ordersAllResponseSelector = (state: RootState) =>
  state.ordersAll.ordersResponse;

export const ordersAllSelector = createSelector(
  ordersAllResponseSelector,
  ingredientsMapSelector,
  (ordersAllResponse, ingredientsMap) => {
    if (ordersAllResponse) {
      return ordersAllResponse.orders.map<OrderWithIngredients>((order) => ({
        ...order,
        ingredients:
          order.ingredients.map(
            (ingredientId) => ingredientsMap[ingredientId]
          ) ?? [],
      }));
    }

    return [];
  }
);
