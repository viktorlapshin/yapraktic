import React from "react";
import { ingredientPropType } from "@utils/prop-types.js";
import styles from "./burger-ingredients-item.module.css";

export const BurgerIngredienstItem = ({ ingredient }) => {
  return (
    <div className={styles.container_ingridient}>
      <img src={ingredient.image} alt="" />
      <h3>{ingredient.price}</h3>
      <p>{ingredient.name}</p>
    </div>
  );
};

BurgerIngredienstItem.propTypes = {
  ingredient: ingredientPropType,
};
