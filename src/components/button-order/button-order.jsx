import React, { useState } from "react";
import styles from "./button-order.module.css";
import * as PropTypes from "prop-types";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector } from "react-redux";
import {
  bunIngredientsSelector,
  ingredientsSelector,
} from "../../services/reducers/ingredients-slice";

export const ButtonOrder = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const ingredients = useSelector(ingredientsSelector);
  const bun = useSelector(bunIngredientsSelector);

  const totalPrice =
    ingredients.reduce((sum, item) => sum + item.price, 0) +
    (bun ? bun.price * 2 : 0);

  const ingredientIds = [
    ...(bun ? [bun._id] : []),
    ...ingredients.map(item => item._id),
    ...(bun ? [bun._id] : []),
  ];

  const handleOrder = async () => {
    setIsLoading(true);
    setError(null);
    setOrderNumber(null);
    setIsModalOpen(true);

    try {
      const response = await fetch("https://norma.nomoreparties.space/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Ошибка при оформлении заказа");
      }

      setOrderNumber(data.order.number);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrderNumber(null);
    setError(null);
  };

  return (
    <div className={styles.order_block}>
      <h1>
        <span>{totalPrice}</span> <CurrencyIcon />
      </h1>
      <Button
        onClick={handleOrder}
        htmlType="button"
        disabled={ingredientIds.length < 3 || isLoading}
      >
        {isLoading ? "Оформляем..." : text}
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {isLoading && <p>Оформляем заказ...</p>}
        {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
        {orderNumber && <OrderDetails orderNumber={orderNumber} />}
      </Modal>
    </div>
  );
};

ButtonOrder.propTypes = {
  text: PropTypes.string.isRequired,
};
