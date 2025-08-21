import { OrderWithIngredients } from "@/services/reducers/orders-all/types";
import { FC, useMemo } from "react";
import { Ingridient } from "@/types";
import styles from "./order-full-details.module.css";
import { CurrencyIcon as YPCurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { formatOrderDate } from "@/utils/orders";

const CurrencyIcon: FC<{ size?: number }> = ({ size = 20 }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      transform: `scale(${size / 20})`,
      transformOrigin: "left center",
    }}
    aria-hidden
  >
    <YPCurrencyIcon type="primary" />
  </span>
);

interface OrderFullDetailsProps {
  order: OrderWithIngredients;
}

export const OrderFullDetails: FC<OrderFullDetailsProps> = ({ order }) => {
  const counts = useMemo<Record<string, number>>(() => {
    return order.ingredients.reduce<Record<string, number>>(
      (accumulate, ingredient) => {
        const id = ingredient._id;
        accumulate[id] = (accumulate[id] ?? 0) + 1;
        return accumulate;
      },
      {}
    );
  }, [order.ingredients]);

  const uniqueIngredientsById = useMemo(() => {
    const ids = new Set<string>();
    return order.ingredients.reduce<Ingridient[]>((acc, ingredient) => {
      if (!ids.has(ingredient._id)) {
        ids.add(ingredient._id);
        acc.push(ingredient);
      }
      return acc;
    }, []);
  }, [order.ingredients]);

  const totalPrice = useMemo(() => {
    return uniqueIngredientsById.reduce((sum, ing) => {
      const c = counts[ing._id] ?? 0;
      return sum + c * (ing.price ?? 0);
    }, 0);
  }, [uniqueIngredientsById, counts]);

  const readableStatus = useMemo(() => {
    switch (order.status) {
      case "done":
        return "Выполнен";
      case "pending":
        return "Готовится";
      case "created":
        return "Создан";
      default:
        return order.status ?? "";
    }
  }, [order.status]);

  const dateText = useMemo(() => {
    return formatOrderDate(order.updatedAt ?? order.createdAt ?? Date.now());
  }, [order.updatedAt, order.createdAt]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.number}>#{order.number ?? "—"}</div>

      <div className={styles.title}>{order.name}</div>

      {!!readableStatus && (
        <div className={styles.status}>{readableStatus}</div>
      )}

      <div className={styles.sectionTitle}>Состав:</div>

      <div className={styles.list}>
        {uniqueIngredientsById.map((ingredient) => {
          const qty = counts[ingredient._id] ?? 0;
          const price = ingredient.price ?? 0;
          const lineTotal = qty * price;

          return (
            <div className={styles.row} key={ingredient._id}>
              <div className={styles.thumb} aria-hidden>
                <div className={styles.thumbInner}>
                  {ingredient.image_mobile ? (
                    <img src={ingredient.image_mobile} alt="" />
                  ) : ingredient.image ? (
                    <img src={ingredient.image} alt="" />
                  ) : null}
                </div>
              </div>

              <div className={styles.name}>{ingredient.name}</div>

              <div className={styles.qtyPrice} title={`${qty} × ${price}`}>
                <span>{qty}</span>
                <span className={styles.multiplication}>×</span>
                <span className={styles.currency}>
                  {price}
                  <CurrencyIcon />
                </span>
                <span className={styles.multiplication} aria-hidden>
                  ＝
                </span>
                <span className={styles.currency}>
                  {lineTotal}
                  <CurrencyIcon />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <div>{dateText}</div>
        <div className={styles.total}>
          {totalPrice}
          <CurrencyIcon size={22} />
        </div>
      </div>
    </div>
  );
};
