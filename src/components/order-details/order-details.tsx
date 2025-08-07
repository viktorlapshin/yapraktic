import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderDetails = ({ orderNumber, onClose }) => {
  return (
    <div className={styles.order_block}>
      <button
        className={styles.close_button}
        onClick={onClose}
        aria-label="Закрыть"
        type="button"
      >
        <CloseIcon type="primary" />
      </button>
      <p className={styles.order_number}>
        {orderNumber ? orderNumber : "—"}
      </p>
      <p className={`${styles.title} text text_type_main-large`}>
        идентификатор заказа
      </p>
      <img
        className={styles.check_mark}
        src="/images/check_mark.png"
        alt="check_mark"
      />
      <p className={`${styles.title} text text_type_main`}>
        Ваш заказ начали готовить
      </p>
      <p className={styles.modal_text}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func.isRequired,
};
