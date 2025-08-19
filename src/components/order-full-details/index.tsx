import { Order } from "@/services/reducers/orders-all/types";
import { FC } from "react";

interface OrderFullDetailsProps {
  order: Order;
}

export const OrderFullDetails: FC<OrderFullDetailsProps> = ({ order }) => {
  return <div>{order.name}</div>;
};
