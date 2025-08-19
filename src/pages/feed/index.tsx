import { OrderItem } from "@/components/order-item";
import {
  ordersAllConnect,
  ordersAllDisconnect,
} from "@/services/reducers/orders-all/actions";
import { ordersAllResponseSelector, ordersAllSelector } from "@/services/reducers/orders-all/slice";
import { useAppDispatch } from "@/services/store";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const ordersAllResponse = useSelector(ordersAllResponseSelector);
  const ordersAll = useSelector(ordersAllSelector)

  useEffect(() => {
    dispatch(ordersAllConnect("wss://norma.nomoreparties.space/orders/all"));

    return () => {
      dispatch(ordersAllDisconnect());
    };
  }, [dispatch]);

  // ordersAllResponse?.total ordersAllResponse?.totalToday

  return (
    <>
      feed
      <div>
        {ordersAll.map((order) => (
          <Link
            key={order._id}
            to={`/order/${order.number}`}
            state={{ backgroundLocation: location }}
          >
            <OrderItem order={order} />
          </Link>
        ))}
      </div>
    </>
  );
};
