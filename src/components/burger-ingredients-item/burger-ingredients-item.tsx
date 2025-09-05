import styles from "./burger-ingredients-item.module.css";
import { FC } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, DragPreviewImage } from "react-dnd";
import {
  ingredientsSelector,
  bunIngredientsSelector,
} from "../../services/reducers/ingredients-slice";
import { Ingridient } from "@/types";
import { useAppSelector } from "@/services/store";

interface BurgerIngredienstItemProps {
  ingredient: Ingridient;
}

export const BurgerIngredienstItem: FC<BurgerIngredienstItemProps> = ({
  ingredient,
}) => {
  const [_, drag, dragPreview] = useDrag(() => ({
    type: ingredient.type === "bun" ? "bun" : "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const allIngredients = useAppSelector(ingredientsSelector);
  const bun = useAppSelector(bunIngredientsSelector);

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
      <div
        ref={drag}
        className={styles.container_ingridient}
        data-cy="burger-ingredient-item"
      >
        {count > 0 && <Counter count={count} extraClass="" />}
        <img src={ingredient.image} alt={ingredient.name} />
        <h3 className={styles.price}>
          {ingredient.price} <CurrencyIcon type="primary" />
        </h3>
        <p>{ingredient.name}</p>
      </div>
    </>
  );
};
