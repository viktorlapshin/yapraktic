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
  const ingredients = useSelector(ingredientsSelector);
  const bun = useSelector(bunIngredientsSelector);

  const totalPrice =
    ingredients.reduce((sum, item) => sum + item.price, 0) +
    (bun ? bun.price * 2 : 0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={styles.order_block}>
      <h1>
        <span>{totalPrice}</span> <CurrencyIcon />
      </h1>
      <Button onClick={handleOpenModal} htmlType="button">
        {text}
      </Button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <OrderDetails />
      </Modal>
    </div>
  );
};

ButtonOrder.propTypes = {
  text: PropTypes.string.isRequired,
};
