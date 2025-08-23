import { type AuthState } from "./reducers/auth-slice";
import { type IngridientsState } from "./reducers/ingredients-slice";
import { type OrderState } from "./reducers/order-slice";
import { OrdersAllState } from "./reducers/orders-all/slice";
import { type ProfileState } from "./reducers/profile-slice";
import { type store } from "./store";

export type Store = typeof store;
export type RootState = {
  auth: AuthState;
  ingredientsSlice: IngridientsState;
  order: OrderState;
  ingredients: IngridientsState;
  profile: ProfileState;
  ordersAll: OrdersAllState;
  orders: OrdersAllState;
};
export type AppDispatch = Store["dispatch"];
