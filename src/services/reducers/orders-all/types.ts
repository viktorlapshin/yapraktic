import { Ingridient } from "@/types";

export type OrderStatus = "done" | "pending" | "created"

export interface Order {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: OrderStatus;
  updatedAt: string;
  _id: string;
}

export interface OrderResponse {
  orders: Order[];
  success: boolean;
  total: number;
  totalToday: number;
}

export interface OrderWithIngredients extends Omit<Order, "ingredients"> {
  ingredients: Ingridient[];
}
