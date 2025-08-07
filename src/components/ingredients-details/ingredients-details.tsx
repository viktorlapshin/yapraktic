import React from "react";
import styles from "./ingredients-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}

interface IngredientsDetailsProps {
  selectedIngredient: Ingredient;
  onClose: () => void;
}

export const IngredientsDetails: React.FC<IngredientsDetailsProps> = ({
  selectedIngredient,
  onClose,
}) => {
  return (
    <div className={styles.details}>
      <div className={styles.title}>
        <h1>Детали ингредиента</h1>
        <button
          className={styles.close_button}
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
        >
          <CloseIcon type="primary" />
        </button>
      </div>
      <img
        className={styles.image}
        src={selectedIngredient.image_large}
        alt={selectedIngredient.name}
      />
      <div className={styles.ingredient_name}>
        <p>{selectedIngredient.name}</p>
        <div className={styles.details_list}>
          <div className={styles.item}>
            <div className={styles.header}>Калории, ккал</div>
            <div className={styles.value}>{selectedIngredient.calories}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.header}>Белки, г</div>
            <div className={styles.value}>{selectedIngredient.proteins}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.header}>Жиры, г</div>
            <div className={styles.value}>{selectedIngredient.fat}</div>
          </div>
          <div className={styles.item}>
            <div className={styles.header}>Углеводы, г</div>
            <div className={styles.value}>
              {selectedIngredient.carbohydrates}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
