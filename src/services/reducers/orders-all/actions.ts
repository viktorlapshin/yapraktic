import { createAction } from "@reduxjs/toolkit";
import { OrderResponse } from "./types";

export const ordersAllConnect = createAction<string>("ordersAll/connect");
export const ordersAllDisconnect = createAction("ordersAll/disconnect");

export const ordersAllOnConnecting = createAction("ordersAll/onConnecting");
export const ordersAllOnOpen = createAction("ordersAll/onOpen");
export const ordersAllOnClose = createAction("ordersAll/onClose");
export const ordersAllOnError = createAction<string>("ordersAll/onError");
export const ordersAllOnMessage = createAction<OrderResponse>(
  "ordersAll/onMessage"
);

export type LiveTableActionTypes =
  | ReturnType<typeof ordersAllConnect>
  | ReturnType<typeof ordersAllDisconnect>
  | ReturnType<typeof ordersAllOnConnecting>
  | ReturnType<typeof ordersAllOnOpen>
  | ReturnType<typeof ordersAllOnClose>
  | ReturnType<typeof ordersAllOnError>
  | ReturnType<typeof ordersAllOnMessage>;
