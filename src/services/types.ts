import { type store } from "./store";

export type Store = typeof store

export type RootState = ReturnType<Store['getState']>