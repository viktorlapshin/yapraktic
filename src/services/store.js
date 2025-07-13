import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/ingredients-slice';
import ingredientsReducer from "./reducers/ingredients-slice";
import orderReducer from "./reducers/order-slice";

export const store = configureStore({
  reducer: {
    ingredientsSlice: ingredientsSlice.reducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
  },
})