import React from "react";
import { ingredientPropType } from "@utils/prop-types.js";
import styles from "./burger-constructor-item.module.css";

export const BurgerConstructorItem = ({ ingredient }) => {
  return (
    <div className={styles.container_constructor}>
      <img className={styles.constructor_image} src={ingredient.image} alt="" />
      <span style={{ width: "254px" }}>{ingredient.name}</span>
      <h3 style={{ width: "50px" }}>{ingredient.price}</h3>
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  ingredient: ingredientPropType,
};