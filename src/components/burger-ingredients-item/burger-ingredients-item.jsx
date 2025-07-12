import React from "react";
import { ingredientPropType } from "@utils/prop-types.js";
import styles from "./burger-ingredients-item.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";
import { useSelector } from "react-redux";
import {
  ingredientsSelector,
  bunIngredientsSelector,
} from "../../services/reducers/ingredients-slice";

export const BurgerIngredienstItem = ({ ingredient }) => {
  const [_, drag, dragPreview] = useDrag(() => ({
    type: ingredient.type === "bun" ? "bun" : "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const allIngredients = useSelector(ingredientsSelector);
  const bun = useSelector(bunIngredientsSelector);

  let count = 0;
  if (ingredient.type === "bun") {
    count = bun && bun._id === ingredient._id ? 2 : 0;
  } else {
    count = allIngredients.filter((item) => item._id === ingredient._id).length;
  }

  return (
    <>
      <DragPreviewImage
        // https://github.com/react-dnd/react-dnd/issues/3609
        key={+new Date()}
        src={ingredient.image}
        connect={dragPreview}
      />
      <div ref={drag} className={styles.container_ingridient}>
        {count > 0 && <Counter count={count} extraClass="" />}
        <img src={ingredient.image} alt={ingredient.name} />
        <h3 className={styles.price}>
          {ingredient.price} <CurrencyIcon />
        </h3>
        <p>{ingredient.name}</p>
      </div>
    </>
  );
};

BurgerIngredienstItem.propTypes = {
  ingredient: ingredientPropType,
};
