import { FC, useMemo } from "react";
import styles from "./order-card.module.css";
import { OrderWithIngredients } from "@/services/reducers/orders-all/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatOrderDate } from "@/utils/orders";

type Props = {
  order: OrderWithIngredients;
  showStatus?: boolean;
};

export const OrderCard: FC<Props> = ({ order, showStatus = false }) => {
  const maxIcons = 6;
  const icons = order.ingredients.slice(0, maxIcons);
  const restCount = Math.max(0, order.ingredients.length - maxIcons);

  const formattedDate = useMemo(
    () => formatOrderDate(order.createdAt),
    [order.createdAt]
  );

  const sum = useMemo(
    () =>
      order.ingredients.reduce(
        (accumulate, { price }) => accumulate + price,
        0
      ),
    [order.ingredients]
  );

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.orderNumber}>#{order.number}</span>
        <div className={styles.meta}>
          <time className={styles.date} dateTime={order.createdAt}>
            {formattedDate}
          </time>
          {showStatus && (
            <span
              className={`${styles.status} ${
                order.status === "done"
                  ? styles.statusDone
                  : order.status === "pending"
                    ? styles.statusPending
                    : styles.statusCreated
              }`}
              title={statusLabel(order.status)}
            >
              {statusLabel(order.status)}
            </span>
          )}
        </div>
      </header>

      <h3 className={styles.title}>{order.name}</h3>

      <footer className={styles.footer}>
        <ul className={styles.icons}>
          {icons.map((ing, idx) => {
            const z = icons.length - idx;
            return (
              <li
                key={`${ing._id}-${idx}`}
                className={styles.iconWrap}
                style={{ zIndex: z, transform: `translateX(-${idx * 15}px)` }}
              >
                <img
                  src={ing.image}
                  alt={ing.name}
                  className={styles.iconImg}
                  loading="lazy"
                />
              </li>
            );
          })}
          {restCount > 0 && (
            <span className={styles.restBadge}>+{restCount}</span>
          )}
        </ul>
        <div className={styles.price}>
          {sum} <CurrencyIcon type="primary" />
        </div>
      </footer>
    </article>
  );
};

function statusLabel(status?: string) {
  switch (status) {
    case "done":
      return "Готов";
    case "pending":
      return "В работе";
    case "created":
      return "Создан";
    default:
      return status || "";
  }
}
