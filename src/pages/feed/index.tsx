import { OrderCard } from "@/components/order-card/order-card";
import {
  ordersAllConnect,
  ordersAllDisconnect,
} from "@/services/reducers/orders-all/actions";
import {
  ordersAllResponseSelector,
  ordersAllSelector,
} from "@/services/reducers/orders-all/slice";
import { useAppDispatch } from "@/services/store";
import { FC, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./feed.module.css";

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const ordersAllResponse = useSelector(ordersAllResponseSelector);
  const ordersAll = useSelector(ordersAllSelector);

  useEffect(() => {
    dispatch(ordersAllConnect("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(ordersAllDisconnect());
    };
  }, [dispatch]);

  const { done, pending } = useMemo(() => {
    const doneNumbers: number[] = [];
    const pendingNumbers: number[] = [];
    for (const o of ordersAll) {
      if (o.status === "done") doneNumbers.push(o.number);
      else if (o.status === "pending") pendingNumbers.push(o.number);
    }
    return { done: doneNumbers, pending: pendingNumbers };
  }, [ordersAll]);

  const splitToCols = (arr: number[], perCol = 10) => {
    const col1 = arr.slice(0, perCol);
    const col2 = arr.slice(perCol, perCol * 2);
    return [col1, col2] as const;
  };

  const [doneCol1, doneCol2] = splitToCols(done, 10);
  const [pendCol1, pendCol2] = splitToCols(pending, 10);

  const total = (ordersAllResponse?.total ?? 0).toLocaleString("ru-RU");
  const totalToday = (ordersAllResponse?.totalToday ?? 0).toLocaleString("ru-RU");

  return (
    <section className={styles.feed}>
      <div className={styles.container}>
        <h1 className={styles.title}>Лента заказов</h1>

        <div className={styles.grid}>
          {/* Левая колонка: список заказов */}
          <div className={styles.list} aria-label="Список заказов">
            {ordersAll.map((order) => (
              <Link
                key={order._id}
                to={`/order/${order.number}`}
                state={{ backgroundLocation: location }}
                className={styles.orderLink}
              >
                <OrderCard order={order} />
              </Link>
            ))}
          </div>

          {/* Правая колонка: статусы и итоги */}
          <aside className={styles.sidebar} aria-label="Статусы и итоги">
            <div className={styles.statusBlock}>
              <h2 className={styles.subTitle}>Готовы:</h2>
              <div className={styles.numbersGrid}>
                <ul className={styles.numbersCol}>
                  {doneCol1.map((n) => (
                    <li key={`done-1-${n}`} className={styles.numberDone}>
                      {n}
                    </li>
                  ))}
                </ul>
                <ul className={styles.numbersCol}>
                  {doneCol2.map((n) => (
                    <li key={`done-2-${n}`} className={styles.numberDone}>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.statusBlock}>
              <h2 className={styles.subTitle}>В работе:</h2>
              <div className={styles.numbersGrid}>
                <ul className={styles.numbersCol}>
                  {pendCol1.map((n) => (
                    <li key={`pend-1-${n}`} className={styles.numberPending}>
                      {n}
                    </li>
                  ))}
                </ul>
                <ul className={styles.numbersCol}>
                  {pendCol2.map((n) => (
                    <li key={`pend-2-${n}`} className={styles.numberPending}>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.totalBlock}>
              <h2 className={styles.subTitle}>Выполнено за все время:</h2>
              <div className={styles.totalNumber}>{total}</div>
            </div>

            <div className={styles.totalBlock}>
              <h2 className={styles.subTitle}>Выполнено за сегодня:</h2>
              <div className={styles.totalNumber}>{totalToday}</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
