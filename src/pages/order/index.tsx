import { OrderFullDetails } from "@/components/order-full-details";
import {
  clearSelectedOrder,
  getOrder,
  totalOrderSelector,
} from "@/services/reducers/order-slice";
import { useAppDispatch } from "@/services/store";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Order: FC = () => {
  const { orderNumber } = useParams();
  const dispatch = useAppDispatch();

  const order = useSelector(totalOrderSelector(Number(orderNumber)));

  useEffect(() => {
    if (orderNumber) {
      dispatch(getOrder(Number(orderNumber)));

      return () => {
        dispatch(clearSelectedOrder());
      };
    }
  }, []);

  if (!order) {
    return null;
  }

  return (
    <>
      <OrderFullDetails order={order} />
    </>
  );
};
