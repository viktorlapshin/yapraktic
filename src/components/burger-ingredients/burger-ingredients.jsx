import React, { useState } from "react";
import styles from "./burger-ingredients.module.css";
import * as PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "@utils/prop-types.js";
import { BurgerIngredienstItem } from "../burger-ingredients-item/burger-ingredients-item";
import { Modal } from "../modal/modal";

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
        <h1 style={{ marginBottom: "0" }}>Булки</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "bun")
            .map((ingredient) => (
              <li
                className={styles.ingredient_list_point}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
                style={{ cursor: "pointer" }}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>
        <h1 style={{ margin: "0" }}>Начинки</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "main")
            .map((ingredient) => (
              <li
                className={styles.ingredient_list_point}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
                style={{ cursor: "pointer" }}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>
        <h1 style={{ margin: "0" }}>Соусы</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "sauce")
            .map((ingredient) => (
              <li
                className={styles.ingredient_list_point}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
                style={{ cursor: "pointer" }}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>
      </div>

      <Modal isOpen={!!selectedIngredient} onClose={handleCloseModal}>
        {selectedIngredient && (
          <div>
            <h1>Детали ингридиента</h1>
            <img
              src={selectedIngredient.image_large}
              alt={selectedIngredient.name}
            />
            <p style={{textAlign:"center", fontSize:"large"}}>{selectedIngredient.name}</p>
            <div className={styles.details_list}>
              <div className={styles.item}>
                <div className={styles.header}>Калории, ккал</div>
                <div className={styles.value}>
                  {selectedIngredient.calories}
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.header}>Белки, г</div>
                <div className={styles.value}>
                  {selectedIngredient.proteins}
                </div>
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
        )}
      </Modal>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
