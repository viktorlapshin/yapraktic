import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../../constants";
import { checkResponse } from "../../utils/check-response";

const initialState = {
  allIngredients: [],
  bunIngredient: undefined,
  ingredients: [],
  isLoading: false,
  isError: false
};

export const getIngredients = createAsyncThunk(
  "ingredientsSlice/getIngredients",
  async () => {
    return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredientsSlice",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action) => {
        if (action.payload.type === "bun") {
          state.bunIngredient = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient) => {
        return {
          payload: {
            ...ingredient,
            uniqueId: uuidv4()
          }
        };
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.allIngredients = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { addIngredient, removeIngredient, moveIngredient } = ingredientsSlice.actions;

export const bunIngredientsSelector = (store) => store.ingredientsSlice.bunIngredient;
export const allIngredientsSelector = (store) => store.ingredientsSlice.allIngredients;
export const ingredientsSelector = (store) => store.ingredientsSlice.ingredients;
export const isLoadingSelector = (store) => store.ingredientsSlice.isLoading;
export const isErrorSelector = (store) => store.ingredientsSlice.isError;

export default ingredientsSlice.reducer;
