import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/ingredients-slice';
import ingredientsReducer from "./reducers/ingredients-slice";
import orderReducer from "./reducers/order-slice";
import { authSlice } from './reducers/auth-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingredientsSlice: ingredientsSlice.reducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
  },
})