import styles from "./burger-constructor-item.module.css";
import {
  DeleteIcon,
  LockIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { Ingridient } from "@/types";

interface BurgerConstructorItemProps {
  ingredient: Ingridient,
  disabled: boolean,
  additionalText: string,
}

export const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({
  ingredient,
  disabled,
  additionalText,
}) => {
  return (
    <div className={styles.container_constructor}>
      <img className={styles.constructor_image} src={ingredient.image} alt="" />
      <span className={styles.name}>
        {ingredient.name}
        {additionalText && ` ${additionalText}`}
      </span>
      <h3 className={styles.price}>
        <span>{ingredient.price}</span> <CurrencyIcon type="primary" />
      </h3>
      <button className={styles.button_delete} disabled={disabled}>
        {disabled ? <LockIcon type="disabled" /> : <DeleteIcon type="primary" />}
      </button>
    </div>
  );
};