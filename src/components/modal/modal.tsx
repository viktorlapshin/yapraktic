import React, { useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

// 1. Описываем интерфейс пропсов
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// 2. Используем интерфейс в компоненте
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // 3. Проверяем, что элемент существует (TypeScript safety)
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
