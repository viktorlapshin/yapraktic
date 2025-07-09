import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bunIngredient: undefined,
  ingredients: [],
};

export const ingredientsSlice = createSlice({
  name: "ingredientsSlice",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bunIngredient = action.payload
      } else {
        state.ingredients.push({ uniqueId: +new Date(), ...action.payload});
      }
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId !== action.payload
      );
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
} = ingredientsSlice.actions;

export const bunIngredientsSelector = (store) =>
  store.ingredientsSlice.bunIngredient;

export const ingredientsSelector = (store) =>
  store.ingredientsSlice.ingredients;

export default ingredientsSlice.reducer;
