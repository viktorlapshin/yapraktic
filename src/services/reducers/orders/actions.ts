import { createAction } from "@reduxjs/toolkit";
import { OrderResponse } from "../orders-all/types";

export const ordersConnect = createAction<string>("orders/connect");
export const ordersDisconnect = createAction("orders/disconnect");

export const ordersOnConnecting = createAction("orders/onConnecting");
export const ordersOnOpen = createAction("orders/onOpen");
export const ordersOnClose = createAction("orders/onClose");
export const ordersOnError = createAction<string>("orders/onError");
export const ordersOnMessage = createAction<OrderResponse>("orders/onMessage");

export type LiveTableActionTypes =
  | ReturnType<typeof ordersConnect>
  | ReturnType<typeof ordersDisconnect>
  | ReturnType<typeof ordersOnConnecting>
  | ReturnType<typeof ordersOnOpen>
  | ReturnType<typeof ordersOnClose>
  | ReturnType<typeof ordersOnError>
  | ReturnType<typeof ordersOnMessage>;
