import React from "react";
import styles from "./burger-constructor.module.css";
import * as PropTypes from "prop-types";
import { ingredientPropType } from "@utils/prop-types.js";
import { ButtonOrder } from "../button-order/button-order";
import { BurgerConstructorItem } from "../burger-constructor-item/burger-constructor-item";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const BurgerConstructor = ({ ingredients }) => {
  console.log(ingredients);

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.burger_consructor_list}>
        <div className={styles.top_bun}>
          <BurgerConstructorItem ingredient={ingredients[0]} disabled />
        </div>
        <ul className={styles.list_food}>
          {ingredients.slice(1, ingredients.length - 1).map((ingredient) => (
            <li className={styles.point_list_food} key={ingredient._id}>
              <DragIcon />
              <BurgerConstructorItem ingredient={ingredient} />
            </li>
          ))}
        </ul>
        <div className={styles.bottom_bun}>
          <BurgerConstructorItem
            ingredient={ingredients[ingredients.length - 1]}
            disabled
          />
        </div>
      </div>

      <ButtonOrder text="Оформить заказ" />
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
