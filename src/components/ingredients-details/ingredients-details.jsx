import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "@utils/prop-types.js";
import styles from "./ingredients-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const IngredientsDetails = ({ selectedIngredient, onClose }) => {
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
          <CloseIcon />
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

IngredientsDetails.propTypes = {
  selectedIngredient: ingredientPropType.isRequired,
  onClose: PropTypes.func.isRequired,
};
