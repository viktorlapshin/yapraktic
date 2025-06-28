import React from "react";
import { ingredientPropType } from "@utils/prop-types.js";
import styles from "./burger-ingredients-item.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerIngredienstItem = ({ ingredient }) => {
  return (
    <div className={styles.container_ingridient}>
      <Counter count={1} extraClass="" />
      <img src={ingredient.image} alt="" />
      <h3 className={styles.price}>{ingredient.price} <CurrencyIcon /></h3>
      <p>{ingredient.name}</p>
    </div>
  );
};

BurgerIngredienstItem.propTypes = {
  ingredient: ingredientPropType,
};
