import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./app.module.css";
import { BurgerIngredients } from "@components/burger-ingredients/burger-ingredients.jsx";
import { BurgerConstructor } from "@components/burger-constructor/burger-constructor.jsx";
import { AppHeader } from "@components/app-header/app-header.jsx";
import { useSelector } from "react-redux";
import {
  ingredientsSelector,
  getIngredients,
  isLoadingSelector,
  isErrorSelector,
  allIngredientsSelector,
} from "../../services/reducers/ingredients-slice";

export const App = () => {
  const dispatch = useDispatch();

  const allIngredients = useSelector(allIngredientsSelector);
  const constructorIngredients = useSelector(ingredientsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);

  useEffect(() => {
    dispatch(getIngredients());
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
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
    </div>
  );
};
