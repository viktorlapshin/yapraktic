import {
  ingredientsSlice,
  getIngredients,
  addIngredient,
  removeIngredient,
  moveIngredient,
  initialState,
} from "../reducers/ingredients-slice";
import { Ingridient } from "@/types";

const mockIngredient: Ingridient = {
  _id: "test-id",
  name: "Test Ingredient",
  type: "sauce",
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 100,
  price: 50,
  image: "test-image.png",
  image_mobile: "test-image-mobile.png",
  image_large: "test-image-large.png",
  __v: 0,
};

const mockBunIngredient: Ingridient = {
  ...mockIngredient,
  _id: "bun-id",
  name: "Test Bun",
  type: "bun",
};

describe("Ingredients slice tests", () => {
  describe("Initial state", () => {
    it("should return the initial state", () => {
      expect(ingredientsSlice.reducer(undefined, { type: "" })).toEqual(
        initialState
      );
    });
  });

  describe("GetIngredients async thunk", () => {
    it("should set loading to true and error to false when getIngredients is pending", () => {
      const state = {
        ...initialState,
        isLoading: false,
        isError: true,
      };

      expect(
        ingredientsSlice.reducer(state, {
          type: getIngredients.pending.type,
        })
      ).toEqual({
        ...state,
        isLoading: true,
        isError: false,
      });
    });

    it("should set allIngredients and loading to false when getIngredients is fulfilled", () => {
      const mockData = [mockIngredient, mockBunIngredient];

      expect(
        ingredientsSlice.reducer(initialState, {
          type: getIngredients.fulfilled.type,
          payload: { data: mockData },
        })
      ).toEqual({
        ...initialState,
        allIngredients: mockData,
        isLoading: false,
      });
    });

    it("should set loading to false and error to true when getIngredients is rejected", () => {
      expect(
        ingredientsSlice.reducer(initialState, {
          type: getIngredients.rejected.type,
        })
      ).toEqual({
        ...initialState,
        isLoading: false,
        isError: true,
      });
    });
  });

  describe("AddIngredient action", () => {
    it("should add bun ingredient to bunIngredient field", () => {
      const action = addIngredient(mockBunIngredient);
      const result = ingredientsSlice.reducer(initialState, action);

      expect(result.bunIngredient).toEqual({
        ...mockBunIngredient,
        uniqueId: expect.any(String),
      });
      expect(result.ingredients).toEqual([]);
    });

    it("should add non-bun ingredient to ingredients array", () => {
      const action = addIngredient(mockIngredient);
      const result = ingredientsSlice.reducer(initialState, action);

      expect(result.bunIngredient).toBeUndefined();
      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0]).toEqual({
        ...mockIngredient,
        uniqueId: expect.any(String),
      });
    });

    it("should replace existing bun when adding new bun", () => {
      const firstBun = { ...mockBunIngredient, _id: "first-bun" };
      const secondBun = { ...mockBunIngredient, _id: "second-bun" };

      let state = ingredientsSlice.reducer(
        initialState,
        addIngredient(firstBun)
      );
      state = ingredientsSlice.reducer(state, addIngredient(secondBun));

      expect(state.bunIngredient?._id).toBe("second-bun");
    });
  });

  describe("RemoveIngredient action", () => {
    it("should remove ingredient by uniqueId", () => {
      const uniqueId = "test-unique-id";
      const stateWithIngredient = {
        ...initialState,
        ingredients: [
          { ...mockIngredient, uniqueId },
          { ...mockIngredient, uniqueId: "other-id" },
        ],
      };

      const result = ingredientsSlice.reducer(
        stateWithIngredient,
        removeIngredient(uniqueId)
      );

      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0].uniqueId).toBe("other-id");
    });

    it("should not change state if uniqueId not found", () => {
      const stateWithIngredient = {
        ...initialState,
        ingredients: [{ ...mockIngredient, uniqueId: "existing-id" }],
      };

      const result = ingredientsSlice.reducer(
        stateWithIngredient,
        removeIngredient("non-existing-id")
      );

      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0].uniqueId).toBe("existing-id");
    });
  });

  describe("MoveIngredient action", () => {
    it("should move ingredient from dragIndex to hoverIndex", () => {
      const ingredients = [
        { ...mockIngredient, uniqueId: "id-1", name: "First" },
        { ...mockIngredient, uniqueId: "id-2", name: "Second" },
        { ...mockIngredient, uniqueId: "id-3", name: "Third" },
      ];

      const stateWithIngredients = {
        ...initialState,
        ingredients,
      };

      // Move first ingredient to second position
      const result = ingredientsSlice.reducer(
        stateWithIngredients,
        moveIngredient({ dragIndex: 0, hoverIndex: 1 })
      );

      expect(result.ingredients[0].name).toBe("Second");
      expect(result.ingredients[1].name).toBe("First");
      expect(result.ingredients[2].name).toBe("Third");
    });

    it("should move ingredient from end to beginning", () => {
      const ingredients = [
        { ...mockIngredient, uniqueId: "id-1", name: "First" },
        { ...mockIngredient, uniqueId: "id-2", name: "Second" },
        { ...mockIngredient, uniqueId: "id-3", name: "Third" },
      ];

      const stateWithIngredients = {
        ...initialState,
        ingredients,
      };

      // Move last ingredient to first position
      const result = ingredientsSlice.reducer(
        stateWithIngredients,
        moveIngredient({ dragIndex: 2, hoverIndex: 0 })
      );

      expect(result.ingredients[0].name).toBe("Third");
      expect(result.ingredients[1].name).toBe("First");
      expect(result.ingredients[2].name).toBe("Second");
    });
  });
});
