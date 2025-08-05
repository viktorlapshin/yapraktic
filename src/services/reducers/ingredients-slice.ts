import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { BASE_URL } from "../../constants";
import { checkResponse } from "@/utils/api";
import { Ingridient, UniqueIngridient, Move } from "@/types";
import { RootState } from "../types";

interface IngridientsState {
  allIngredients: Ingridient[];
  bunIngredient?: Ingridient;
  ingredients: UniqueIngridient[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: IngridientsState = {
  allIngredients: [],
  bunIngredient: undefined,
  ingredients: [],
  isLoading: false,
  isError: false,
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
      reducer: (state, action: PayloadAction<UniqueIngridient>) => {
        if (action.payload.type === "bun") {
          state.bunIngredient = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: Ingridient) => {
        return {
          payload: {
            ...ingredient,
            uniqueId: uuidv4(),
          },
        };
      },
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uniqueId !== action.payload
      );
    },
    moveIngredient: (state, action: PayloadAction<Move>) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedItem);
    },
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
  },
});

export const { addIngredient, removeIngredient, moveIngredient } =
  ingredientsSlice.actions;

export const bunIngredientsSelector = (store: RootState) =>
  store.ingredientsSlice.bunIngredient;
export const allIngredientsSelector = (store: RootState) =>
  store.ingredientsSlice.allIngredients;
export const ingredientsSelector = (store: RootState) =>
  store.ingredientsSlice.ingredients;
export const isLoadingSelector = (store: RootState) =>
  store.ingredientsSlice.isLoading;
export const isErrorSelector = (store: RootState) =>
  store.ingredientsSlice.isError;

export default ingredientsSlice.reducer;
