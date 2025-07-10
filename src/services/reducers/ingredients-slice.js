import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allIngredients: [],
  bunIngredient: undefined,
  ingredients: [],
  isLoading: false,
  isError: false
};

export const getIngredients = createAsyncThunk(
  `ingredientsSlice/getIngredients`,
  async () => {
    const response = await fetch("https://norma.nomoreparties.space/api/ingredients");
    
    if (!response.ok) {
      throw new Error("Произошла ошибка");
    }

    return await response.json();
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredientsSlice",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.bunIngredient = action.payload;
      } else {
        state.ingredients.push({ uniqueId: +new Date(), ...action.payload });
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
  extraReducers: ({ addCase }) => {
    addCase(getIngredients.pending, (state, action) => {
      state.isLoading = true
    })

    addCase(getIngredients.fulfilled, (state, action) => {
      state.allIngredients = action.payload.data;
      state.isLoading = false
    })

    addCase(getIngredients.rejected, (state, action) => {
      state.isError = true
      state.isLoading = false
    })
  }
});

export const { addIngredient, removeIngredient, moveIngredient } =
  ingredientsSlice.actions;

export const bunIngredientsSelector = (store) =>
  store.ingredientsSlice.bunIngredient;

export const allIngredientsSelector = (store) =>
  store.ingredientsSlice.allIngredients;

export const ingredientsSelector = (store) =>
  store.ingredientsSlice.ingredients;

export const isLoadingSelector = (store) =>
  store.ingredientsSlice.isLoading;

export const isErrorSelector = (store) =>
  store.ingredientsSlice.isError;

export default ingredientsSlice.reducer;
