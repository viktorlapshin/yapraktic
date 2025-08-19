import { OrderItem } from "@/components/order-item";
import {
  ordersConnect,
  ordersDisconnect,
} from "@/services/reducers/orders/actions";
import { ordersResponseSelector, ordersSelector } from "@/services/reducers/orders/slice";
import { useAppDispatch } from "@/services/store";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export const Orders: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const ordersResponse = useSelector(ordersResponseSelector);
  const orders = useSelector(ordersSelector)

  useEffect(() => {
    dispatch(
      ordersConnect(
        "wss://norma.nomoreparties.space/orders/all"
        // `wss://norma.nomoreparties.space/orders?token=${cookies.get("accessToken")?.replace("Bearer ", "")}`
      )
    );

    return () => {
      dispatch(ordersDisconnect());
    };
  }, [dispatch]);

  return (
    <>
      <div>
        {orders.map((order) => (
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
