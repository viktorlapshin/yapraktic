import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./button-order.module.css";
import * as PropTypes from "prop-types";

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export const ButtonOrder = ({ text }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className={styles.order_block}>
      <h1>610</h1>
      <button className={styles.order_button} onClick={handleOpenModal}>
        {text}
      </button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <h1
            style={{
              fontSize: "100px",
              fontFamily: "Iceland",
              fontWeight: "200",
              margin: "0",
            }}
          >
            034536
          </h1>
          <p style={{ fontSize: "large", margin: "0" }}>идентификатор заказа</p>
          <img src="./public/check_mark.png" alt="check_mark" />
          <p style={{ fontSize: "medium", margin: "0" }}>
            ваш заказ начали готовить
          </p>
          <p style={{ fontSize: "small", color: "#8585AD", margin: "0" }}>
            Дождитесь готовности на орбитальной станции
          </p>
        </Modal>
      )}
    </div>
  );
};

ButtonOrder.propTypes = {
  text: PropTypes.string.isRequired,
};
