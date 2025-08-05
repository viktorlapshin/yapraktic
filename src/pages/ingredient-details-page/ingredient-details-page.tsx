import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IngredientsDetails } from "../../components/ingredients-details/ingredients-details";

export const IngredientDetailsPage = () => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredients.allIngredients);
  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) return <div>Ингредиент не найден</div>;

  return (
    <div style={{ margin: "40px auto", maxWidth: 600 }}>
      <IngredientsDetails selectedIngredient={ingredient} onClose={() => {}} />
    </div>
  );
};
