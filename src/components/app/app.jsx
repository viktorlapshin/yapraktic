import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import { BurgerIngredients } from "@components/burger-ingredients/burger-ingredients.jsx";
import { BurgerConstructor } from "@components/burger-constructor/burger-constructor.jsx";
import { AppHeader } from "@components/app-header/app-header.jsx";
import { useSelector } from "react-redux";
import { ingredientsSelector } from "../../services/reducers/ingredients-slice";

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const constructorIngredients = useSelector(ingredientsSelector);

  useEffect(() => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Произошла ошибка");
        }

        return response.json();
      })
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
          <BurgerConstructor ingredients={constructorIngredients} />
        </main>
      )}
    </div>
  );
};
