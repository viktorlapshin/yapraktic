import { useState, useRef, useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { BurgerIngredienstItem } from "../burger-ingredients-item/burger-ingredients-item";
import { allIngredientsSelector } from "../../services/reducers/ingredients-slice";
import { useNavigate, useLocation } from "react-router-dom";
import { Ingridient } from "@/types";

type TabType = 'bun' | 'main' | 'sauce'

export const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState<TabType>("bun");

  const bunRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const ingredients = useSelector(allIngredientsSelector);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenModal = (ingredient: Ingridient) => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { backgroundLocation: location },
    });
  };

  const scrollToSection = (type: TabType) => {
    if (type === "bun" && bunRef.current) {
      bunRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (type === "main" && mainRef.current) {
      mainRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (type === "sauce" && sauceRef.current) {
      sauceRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        !bunRef.current ||
        !mainRef.current ||
        !sauceRef.current ||
        !containerRef.current
      )
        return;

      const containerTop = containerRef.current?.getBoundingClientRect().top;

      const bunTop = Math.abs(
        bunRef.current?.getBoundingClientRect()?.top - containerTop
      );
      const mainTop = Math.abs(
        mainRef.current?.getBoundingClientRect()?.top - containerTop
      );
      const sauceTop = Math.abs(
        sauceRef.current?.getBoundingClientRect()?.top - containerTop
      );

      const min = Math.min(bunTop, mainTop, sauceTop);

      if (min === bunTop) setCurrentTab("bun");
      else if (min === mainTop) setCurrentTab("main");
      else setCurrentTab("sauce");
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={currentTab === "bun"}
            onClick={() => scrollToSection("bun")}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={currentTab === "main"}
            onClick={() => scrollToSection("main")}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={currentTab === "sauce"}
            onClick={() => scrollToSection("sauce")}
          >
            Соусы
          </Tab>
        </ul>
      </nav>

      <div className={styles.ingredients_block} ref={containerRef}>
        <h1 ref={bunRef}>Булки</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "bun")
            .map((ingredient) => (
              <li
                key={ingredient._id}
                className={styles.ingredient_list_point}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>

        <h1 ref={mainRef}>Начинки</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "main")
            .map((ingredient) => (
              <li
                key={ingredient._id}
                className={styles.ingredient_list_point}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>

        <h1 ref={sauceRef}>Соусы</h1>
        <ul className={styles.ingredients_list}>
          {ingredients
            .filter((item) => item.type === "sauce")
            .map((ingredient) => (
              <li
                key={ingredient._id}
                className={styles.ingredient_list_point}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredienstItem ingredient={ingredient} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
