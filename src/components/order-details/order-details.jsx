import React from "react";
import styles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetails = ({ onClose }) => {
  return (
    <>
      <div className={styles.order_block}>
        <button
          className={styles.close_button}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <CloseIcon />
        </button>
        <p className={styles.order_number}>034536</p>
        <p className={`${styles.title} text text_type_main-large`}>
          идентификатор заказа
        </p>
        <img className={styles.check_mark} src="./public/images/check_mark.png" alt="check_mark" />
        <p className={`${styles.title} text text_type_main`}>
          Ваш заказ начали готовить
        </p>
        <p className={styles.modal_text}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
};
