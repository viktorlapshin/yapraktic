import styles from "./home.module.css";
import { BurgerIngredients } from "@components/burger-ingredients/burger-ingredients.jsx";
import { BurgerConstructor } from "@components/burger-constructor/burger-constructor.jsx";

export const Home = () => (
  <>
    <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
      Соберите бургер
    </h1>
    <main className={`${styles.main} pl-5 pr-5`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  </>
);
