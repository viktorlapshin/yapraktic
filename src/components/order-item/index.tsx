import { OrderWithIngredients } from "@/services/reducers/orders-all/types";
import { FC } from "react";

interface OrderItemProps {
  order: OrderWithIngredients;
}

export const OrderItem: FC<OrderItemProps> = ({ order }) => {
  console.log(order.ingredients);
  

  return <div>{order.name}</div>;
};
