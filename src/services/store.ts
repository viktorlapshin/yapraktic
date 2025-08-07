import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./reducers/ingredients-slice";
import ingredientsReducer from "./reducers/ingredients-slice";
import orderReducer from "./reducers/order-slice";
import { authSlice } from "./reducers/auth-slice";
import { profileSlice } from "./reducers/profile-slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingredientsSlice: ingredientsSlice.reducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    profile: profileSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
