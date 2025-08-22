import { configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from "./reducers/ingredients-slice";
import ingredientsReducer from "./reducers/ingredients-slice";
import orderReducer from "./reducers/order-slice";
import { authSlice } from "./reducers/auth-slice";
import { profileSlice } from "./reducers/profile-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, type AppDispatch } from "./types";
import { socketMiddleware } from "@/services/middleware/socket-middleware";
import {
  ordersAllConnect,
  ordersAllDisconnect,
  ordersAllOnConnecting,
  ordersAllOnOpen,
  ordersAllOnClose,
  ordersAllOnError,
  ordersAllOnMessage,
} from "./reducers/orders-all/actions";
import { ordersAllSlice } from "./reducers/orders-all/slice";
import { ordersSlice } from "./reducers/orders/slice";
import {
  ordersConnect,
  ordersDisconnect,
  ordersOnConnecting,
  ordersOnOpen,
  ordersOnClose,
  ordersOnError,
  ordersOnMessage,
} from "./reducers/orders/actions";

export const ordersAllMiddleware = socketMiddleware({
  connect: ordersAllConnect,
  disconnect: ordersAllDisconnect,
  onConnecting: ordersAllOnConnecting,
  onOpen: ordersAllOnOpen,
  onClose: ordersAllOnClose,
  onError: ordersAllOnError,
  onMessage: ordersAllOnMessage,
});

export const ordersMiddleware = socketMiddleware(
  {
    connect: ordersConnect,
    disconnect: ordersDisconnect,
    onConnecting: ordersOnConnecting,
    onOpen: ordersOnOpen,
    onClose: ordersOnClose,
    onError: ordersOnError,
    onMessage: ordersOnMessage,
  },
  true
);

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingredientsSlice: ingredientsSlice.reducer,
    order: orderReducer,
    ingredients: ingredientsReducer,
    profile: profileSlice.reducer,
    ordersAll: ordersAllSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersAllMiddleware, ordersMiddleware),
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
