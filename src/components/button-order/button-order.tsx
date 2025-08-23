import { useState, FC } from "react";
import styles from "./button-order.module.css";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  bunIngredientsSelector,
  ingredientsSelector,
} from "../../services/reducers/ingredients-slice";
import { authStatusSelector } from "../../services/reducers/auth-slice";
import { useNavigate } from "react-router-dom";
import {
  sendOrder,
  orderNumberSelector,
  isLoadingOrderSelector,
  errorOrderSelector,
  clearOrder,
} from "../../services/reducers/order-slice";
import { Preloader } from "../preloader/preloader";
import { useAppDispatch, useAppSelector } from "../../services/store";

interface Ingredient {
  _id: string;
  price: number;
}

type AuthStatus = "idle" | "pending" | "fulfilled" | "rejected";

interface ButtonOrderProps {
  text: string;
}

export const ButtonOrder: FC<ButtonOrderProps> = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isLoading = useAppSelector(isLoadingOrderSelector) as boolean;
  const orderNumber = useAppSelector(orderNumberSelector) as number | null;
  const error = useAppSelector(errorOrderSelector) as string | null;

  const ingredients = useAppSelector(ingredientsSelector) as Ingredient[];
  const bun = useAppSelector(bunIngredientsSelector) as Ingredient | null;
  const authStatus = useAppSelector(authStatusSelector) as AuthStatus;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const totalPrice: number =
    ingredients.reduce((sum, item) => sum + item.price, 0) +
    (bun ? bun.price * 2 : 0);

  const ingredientIds: string[] = [
    ...(bun ? [bun._id] : []),
    ...ingredients.map((item) => item._id),
    ...(bun ? [bun._id] : []),
  ];

  const handleOrder = () => {
    if (authStatus !== "fulfilled") {
      navigate("/login");
      return;
    }
    setIsModalOpen(true);
    dispatch(sendOrder(ingredientIds));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearOrder());
  };

  return (
    <div className={styles.order_block}>
      <h1>
        <span>{totalPrice}</span> <CurrencyIcon type="primary" />
      </h1>
      <Button
        onClick={handleOrder}
        htmlType="button"
        disabled={ingredientIds.length < 3 || isLoading}
      >
        {isLoading ? "Оформляем..." : text}
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLoading && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 60, fontSize: 32 }}>
              Оформляем заказ...
              <Preloader />
            </p>
          </div>
        )}
        {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
        {orderNumber && (
          <OrderDetails orderNumber={orderNumber} onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};
