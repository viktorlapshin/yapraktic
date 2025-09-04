import orderSlice, {
  sendOrder,
  getOrder,
  clearOrder,
  clearSelectedOrder,
  initialState,
} from "../reducers/order-slice";
import { Order } from "../reducers/orders-all/types";

const mockOrder: Order = {
  _id: "test-order-id",
  ingredients: ["ingredient-1", "ingredient-2"],
  status: "done",
  name: "Test Order",
  createdAt: "2023-01-01T00:00:00.000Z",
  updatedAt: "2023-01-01T00:00:00.000Z",
  number: 12345,
};

describe("Order slice tests", () => {
  describe("Initial state", () => {
    it("should return the initial state", () => {
      expect(orderSlice(undefined, { type: "" })).toEqual(initialState);
    });
  });

  describe("SendOrder async thunk", () => {
    it("should set loading to true and clear error when sendOrder is pending", () => {
      const stateWithError = {
        ...initialState,
        error: "Previous error",
        orderNumber: 999,
      };

      expect(
        orderSlice(stateWithError, {
          type: sendOrder.pending.type,
        })
      ).toEqual({
        ...initialState,
        loading: true,
        error: null,
        orderNumber: null,
      });
    });

    it("should set orderNumber and loading to false when sendOrder is fulfilled", () => {
      const loadingState = {
        ...initialState,
        loading: true,
      };

      expect(
        orderSlice(loadingState, {
          type: sendOrder.fulfilled.type,
          payload: 12345,
        })
      ).toEqual({
        ...initialState,
        loading: false,
        orderNumber: 12345,
      });
    });

    it("should set loading to false and error when sendOrder is rejected", () => {
      const loadingState = {
        ...initialState,
        loading: true,
      };

      expect(
        orderSlice(loadingState, {
          type: sendOrder.rejected.type,
          error: { message: "Network error" },
        })
      ).toEqual({
        ...initialState,
        loading: false,
        error: "Network error",
      });
    });

    it("should handle sendOrder rejection with null error message", () => {
      const loadingState = {
        ...initialState,
        loading: true,
      };

      expect(
        orderSlice(loadingState, {
          type: sendOrder.rejected.type,
          error: {},
        })
      ).toEqual({
        ...initialState,
        loading: false,
        error: null,
      });
    });
  });

  describe("GetOrder async thunk", () => {
    it("should set selectedOrder when getOrder is fulfilled", () => {
      expect(
        orderSlice(initialState, {
          type: getOrder.fulfilled.type,
          payload: mockOrder,
        })
      ).toEqual({
        ...initialState,
        selectedOrder: mockOrder,
      });
    });

    it("should set selectedOrder to null when getOrder is fulfilled with null payload", () => {
      const stateWithOrder = {
        ...initialState,
        selectedOrder: mockOrder,
      };

      expect(
        orderSlice(stateWithOrder, {
          type: getOrder.fulfilled.type,
          payload: null,
        })
      ).toEqual({
        ...initialState,
        selectedOrder: null,
      });
    });
  });

  describe("ClearOrder action", () => {
    it("should reset order-related state", () => {
      const stateWithData = {
        orderNumber: 12345,
        loading: true,
        error: "Some error",
        selectedOrder: mockOrder,
      };

      expect(orderSlice(stateWithData, clearOrder())).toEqual({
        orderNumber: null,
        loading: false,
        error: null,
        selectedOrder: mockOrder, // selectedOrder should remain unchanged
      });
    });
  });

  describe("ClearSelectedOrder action", () => {
    it("should clear selectedOrder only", () => {
      const stateWithData = {
        orderNumber: 12345,
        loading: true,
        error: "Some error",
        selectedOrder: mockOrder,
      };

      expect(orderSlice(stateWithData, clearSelectedOrder())).toEqual({
        orderNumber: 12345,
        loading: true,
        error: "Some error",
        selectedOrder: null,
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle multiple actions in sequence", () => {
      let state = orderSlice(initialState, { type: sendOrder.pending.type });
      expect(state.loading).toBe(true);

      state = orderSlice(state, {
        type: sendOrder.fulfilled.type,
        payload: 12345,
      });
      expect(state.loading).toBe(false);
      expect(state.orderNumber).toBe(12345);

      state = orderSlice(state, {
        type: getOrder.fulfilled.type,
        payload: mockOrder,
      });
      expect(state.selectedOrder).toEqual(mockOrder);

      state = orderSlice(state, clearOrder());
      expect(state.orderNumber).toBeNull();
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
      expect(state.selectedOrder).toEqual(mockOrder); // Should remain

      state = orderSlice(state, clearSelectedOrder());
      expect(state.selectedOrder).toBeNull();
    });
  });
});
