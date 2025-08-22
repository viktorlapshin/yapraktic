import { FC, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAppDispatch, useAppSelector } from "@/services/store";
import {
  ordersConnect,
  ordersDisconnect,
} from "@/services/reducers/orders/actions";
import { ordersSelector } from "@/services/reducers/orders/slice";
import { OrderCard } from "@/components/order-card/order-card";
import styles from "./orders.module.css";

const cookies = new Cookies(null, { path: "/" });

export const Orders: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const orders = useAppSelector(ordersSelector);

  useEffect(() => {
    dispatch(
      ordersConnect(
        `wss://norma.nomoreparties.space/orders?token=${cookies.get("accessToken")?.replace("Bearer ", "")}`
      )
    );

    return () => {
      dispatch(ordersDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.page}>
      {/* Контент справа */}
      <main className={styles.content}>
        <div className={styles.list} role="list">
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/order/${order.number}`}
              state={{ backgroundLocation: location }}
              className={styles.linkCard}
              role="listitem"
            >
              <OrderCard order={order} showStatus />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};
