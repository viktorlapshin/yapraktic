import { ordersSlice, initialState } from "../reducers/orders/slice";
import { ordersOnMessage } from "../reducers/orders/actions";
import { OrderResponse } from "../reducers/orders-all/types";

const mockOrderResponse: OrderResponse = {
  orders: [
    {
      _id: "order-1",
      ingredients: ["ingredient-1", "ingredient-2"],
      status: "done",
      name: "Test Order 1",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      number: 12345,
    },
    {
      _id: "order-2",
      ingredients: ["ingredient-3", "ingredient-4"],
      status: "pending",
      name: "Test Order 2",
      createdAt: "2023-01-02T00:00:00.000Z",
      updatedAt: "2023-01-02T00:00:00.000Z",
      number: 12346,
    },
  ],
  success: true,
  total: 100,
  totalToday: 10,
};

describe("Orders slice tests", () => {
  describe("Initial state", () => {
    it("should return the initial state", () => {
      expect(ordersSlice.reducer(undefined, { type: "" })).toEqual(
        initialState
      );
    });
  });

  describe("OrdersOnMessage action", () => {
    it("should set ordersResponse when ordersOnMessage is dispatched", () => {
      expect(
        ordersSlice.reducer(initialState, ordersOnMessage(mockOrderResponse))
      ).toEqual({
        ordersResponse: mockOrderResponse,
      });
    });

    it("should replace existing ordersResponse with new data", () => {
      const stateWithOrders = {
        ordersResponse: {
          orders: [
            {
              _id: "old-order",
              ingredients: ["old-ingredient"],
              status: "created" as const,
              name: "Old Order",
              createdAt: "2022-01-01T00:00:00.000Z",
              updatedAt: "2022-01-01T00:00:00.000Z",
              number: 11111,
            },
          ],
          success: true,
          total: 50,
          totalToday: 5,
        },
      };

      expect(
        ordersSlice.reducer(stateWithOrders, ordersOnMessage(mockOrderResponse))
      ).toEqual({
        ordersResponse: mockOrderResponse,
      });
    });

    it("should handle empty orders array", () => {
      const emptyOrderResponse: OrderResponse = {
        orders: [],
        success: true,
        total: 0,
        totalToday: 0,
      };

      expect(
        ordersSlice.reducer(initialState, ordersOnMessage(emptyOrderResponse))
      ).toEqual({
        ordersResponse: emptyOrderResponse,
      });
    });

    it("should handle orders with different statuses", () => {
      const mixedStatusOrders: OrderResponse = {
        orders: [
          {
            _id: "done-order",
            ingredients: ["ingredient-1"],
            status: "done",
            name: "Done Order",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            number: 1001,
          },
          {
            _id: "pending-order",
            ingredients: ["ingredient-2"],
            status: "pending",
            name: "Pending Order",
            createdAt: "2023-01-02T00:00:00.000Z",
            updatedAt: "2023-01-02T00:00:00.000Z",
            number: 1002,
          },
          {
            _id: "created-order",
            ingredients: ["ingredient-3"],
            status: "created",
            name: "Created Order",
            createdAt: "2023-01-03T00:00:00.000Z",
            updatedAt: "2023-01-03T00:00:00.000Z",
            number: 1003,
          },
        ],
        success: true,
        total: 3,
        totalToday: 3,
      };

      expect(
        ordersSlice.reducer(initialState, ordersOnMessage(mixedStatusOrders))
      ).toEqual({
        ordersResponse: mixedStatusOrders,
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle unknown actions gracefully", () => {
      const stateWithOrders = {
        ordersResponse: mockOrderResponse,
      };

      expect(
        ordersSlice.reducer(stateWithOrders, { type: "unknown/action" })
      ).toEqual(stateWithOrders);
    });
  });
});
