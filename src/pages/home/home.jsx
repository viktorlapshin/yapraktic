// src/pages/home.jsx
import React from "react";
import styles from "./home.module.css"; // если нет, используйте app.module.css
import { BurgerIngredients } from "@components/burger-ingredients/burger-ingredients.jsx";
import { BurgerConstructor } from "@components/burger-constructor/burger-constructor.jsx";

export const Home = () => (
  <main className={`${styles.main} pl-5 pr-5`}>
    <BurgerIngredients />
    <BurgerConstructor />
  </main>
);
