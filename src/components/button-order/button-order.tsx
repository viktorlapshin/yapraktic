import React, { useState } from "react";
import styles from "./button-order.module.css";
import * as PropTypes from "prop-types";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
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

export const ButtonOrder = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoading = useSelector(isLoadingOrderSelector);
  const orderNumber = useSelector(orderNumberSelector);
  const error = useSelector(errorOrderSelector);

  const ingredients = useSelector(ingredientsSelector);
  const bun = useSelector(bunIngredientsSelector);
  const authStatus = useSelector(authStatusSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice =
    ingredients.reduce((sum, item) => sum + item.price, 0) +
    (bun ? bun.price * 2 : 0);

  const ingredientIds = [
    ...(bun ? [bun._id] : []),
    ...ingredients.map((item) => item._id),
    ...(bun ? [bun._id] : []),
  ];

  const handleOrder = async () => {
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

ButtonOrder.propTypes = {
  text: PropTypes.string.isRequired,
};
