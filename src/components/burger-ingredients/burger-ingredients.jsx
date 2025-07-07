import React, { useState } from "react";
import styles from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "@utils/prop-types.js";
import { BurgerIngredienstItem } from "../burger-ingredients-item/burger-ingredients-item";
import { Modal } from "../modal/modal";
import { IngredientsDetails } from "../ingredients-details/ingredients-details";

export const BurgerIngredients = ({ ingredients }) => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const handleOpenModal = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleCloseModal = () => {
    setSelectedIngredient(null);
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab value="bun" active={true} onClick={() => {}}>
            Булки
          </Tab>
          <Tab value="main" active={false} onClick={() => {}}>
            Начинки
          </Tab>
          <Tab value="sauce" active={false} onClick={() => {}}>
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.ingredients_block}>
        <h1>Булки</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "bun")
            .map((ingredient) => (
              <li
                className={styles.ingredient_list_point}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>
        <h1>Начинки</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "main")
            .map((ingredient) => (
              <li
                className={styles.ingredient_list_point}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>
        <h1>Соусы</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "sauce")
            .map((ingredient) => (
              <li
                className={styles.ingredient_list_point}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>
      </div>

      <Modal isOpen={!!selectedIngredient} onClose={handleCloseModal}>
        {selectedIngredient && (
          <IngredientsDetails
            selectedIngredient={selectedIngredient}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
