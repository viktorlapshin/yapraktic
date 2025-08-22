import React from "react";
import { useParams } from "react-router-dom";
import {
  IngredientsDetails,
  Ingredient,
} from "../../components/ingredients-details/ingredients-details";
import { useAppSelector } from "@/services/store";

interface RootState {
  ingredients: {
    allIngredients: Ingredient[];
  };
}

type IngredientParams = {
  id: string;
};

export const IngredientDetailsPage: React.FC = () => {
  const { id } = useParams<IngredientParams>();
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.allIngredients
  );
  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) return <div>Ингредиент не найден</div>;

  return (
    <div style={{ margin: "40px auto", maxWidth: 600 }}>
      <IngredientsDetails selectedIngredient={ingredient} onClose={() => {}} />
    </div>
  );
};
