import React from "react";
import { ingredientPropType } from "@utils/prop-types.js";
import styles from "./burger-constructor-item.module.css";
import {
  DeleteIcon,
  LockIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import * as PropTypes from "prop-types";

export const BurgerConstructorItem = ({ ingredient, disabled }) => {
  return (
    <div className={styles.container_constructor}>
      <img className={styles.constructor_image} src={ingredient.image} alt="" />
      <span className={styles.name}>{ingredient.name}</span>
      <h3 className={styles.price}>
        <span>{ingredient.price}</span> <CurrencyIcon />
      </h3>
      <button
        style={{ backgroundColor: "transparent", border: "none" }}
        disabled={disabled}
      >
        {disabled ? <LockIcon color="disabled" /> : <DeleteIcon />}
      </button>
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  ingredient: ingredientPropType,
  disabled: PropTypes.bool,
};
