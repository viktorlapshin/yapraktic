import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import { ingredients } from "@utils/ingredients.js";
import { BurgerIngredients } from "@components/burger-ingredients/burger-ingredients.jsx";
import { BurgerConstructor } from "@components/burger-constructor/burger-constructor.jsx";
import { AppHeader } from "@components/app-header/app-header.jsx";

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIngredients(data.data);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  // console.log({ ingredients, isLoading, isError });

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      {isLoading || isError ? null : (
        <main className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      )}
    </div>
  );
};
