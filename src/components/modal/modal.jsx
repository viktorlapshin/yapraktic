import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};
