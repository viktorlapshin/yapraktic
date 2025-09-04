import { ordersAllSlice, initialState } from "../reducers/orders-all/slice";
import { ordersAllOnMessage } from "../reducers/orders-all/actions";
import { OrderResponse } from "../reducers/orders-all/types";

const mockOrderResponse: OrderResponse = {
  orders: [
    {
      _id: "order-all-1",
      ingredients: ["ingredient-1", "ingredient-2"],
      status: "done",
      name: "Test Order All 1",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      number: 54321,
    },
    {
      _id: "order-all-2",
      ingredients: ["ingredient-3", "ingredient-4"],
      status: "pending",
      name: "Test Order All 2",
      createdAt: "2023-01-02T00:00:00.000Z",
      updatedAt: "2023-01-02T00:00:00.000Z",
      number: 54322,
    },
  ],
  success: true,
  total: 200,
  totalToday: 20,
};

describe("Orders All slice tests", () => {
  describe("Initial state", () => {
    it("should return the initial state", () => {
      expect(ordersAllSlice.reducer(undefined, { type: "" })).toEqual(
        initialState
      );
    });
  });

  describe("OrdersAllOnMessage action", () => {
    it("should set ordersResponse when ordersAllOnMessage is dispatched", () => {
      expect(
        ordersAllSlice.reducer(
          initialState,
          ordersAllOnMessage(mockOrderResponse)
        )
      ).toEqual({
        ordersResponse: mockOrderResponse,
      });
    });

    it("should replace existing ordersResponse with new data", () => {
      const stateWithOrders = {
        ordersResponse: {
          orders: [
            {
              _id: "old-order-all",
              ingredients: ["old-ingredient"],
              status: "created" as const,
              name: "Old Order All",
              createdAt: "2022-01-01T00:00:00.000Z",
              updatedAt: "2022-01-01T00:00:00.000Z",
              number: 99999,
            },
          ],
          success: true,
          total: 100,
          totalToday: 10,
        },
      };

      expect(
        ordersAllSlice.reducer(
          stateWithOrders,
          ordersAllOnMessage(mockOrderResponse)
        )
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
        ordersAllSlice.reducer(
          initialState,
          ordersAllOnMessage(emptyOrderResponse)
        )
      ).toEqual({
        ordersResponse: emptyOrderResponse,
      });
    });

    it("should handle large orders dataset", () => {
      const largeOrdersResponse: OrderResponse = {
        orders: Array.from({ length: 50 }, (_, index) => ({
          _id: `order-${index}`,
          ingredients: [`ingredient-${index}`],
          status:
            index % 3 === 0 ? "done" : index % 3 === 1 ? "pending" : "created",
          name: `Order ${index}`,
          createdAt: `2023-01-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
          updatedAt: `2023-01-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
          number: 10000 + index,
        })) as any,
        success: true,
        total: 1000,
        totalToday: 50,
      };

      const result = ordersAllSlice.reducer(
        initialState,
        ordersAllOnMessage(largeOrdersResponse)
      );

      expect(result.ordersResponse).toEqual(largeOrdersResponse);
      expect(result.ordersResponse?.orders).toHaveLength(50);
    });

    it("should handle orders with all possible statuses", () => {
      const allStatusOrders: OrderResponse = {
        orders: [
          {
            _id: "done-order",
            ingredients: ["ingredient-1"],
            status: "done",
            name: "Done Order",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            number: 2001,
          },
          {
            _id: "pending-order",
            ingredients: ["ingredient-2"],
            status: "pending",
            name: "Pending Order",
            createdAt: "2023-01-02T00:00:00.000Z",
            updatedAt: "2023-01-02T00:00:00.000Z",
            number: 2002,
          },
          {
            _id: "created-order",
            ingredients: ["ingredient-3"],
            status: "created",
            name: "Created Order",
            createdAt: "2023-01-03T00:00:00.000Z",
            updatedAt: "2023-01-03T00:00:00.000Z",
            number: 2003,
          },
        ],
        success: true,
        total: 3,
        totalToday: 3,
      };

      expect(
        ordersAllSlice.reducer(
          initialState,
          ordersAllOnMessage(allStatusOrders)
        )
      ).toEqual({
        ordersResponse: allStatusOrders,
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle unknown actions gracefully", () => {
      const stateWithOrders = {
        ordersResponse: mockOrderResponse,
      };

      expect(
        ordersAllSlice.reducer(stateWithOrders, { type: "unknown/action" })
      ).toEqual(stateWithOrders);
    });

    it("should handle multiple consecutive updates", () => {
      let state = ordersAllSlice.reducer(initialState, { type: "" });

      const firstUpdate: OrderResponse = {
        orders: [
          {
            _id: "first-order",
            ingredients: ["ingredient-1"],
            status: "pending",
            name: "First Order",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z",
            number: 3001,
          },
        ],
        success: true,
        total: 1,
        totalToday: 1,
      };

      state = ordersAllSlice.reducer(state, ordersAllOnMessage(firstUpdate));
      expect(state.ordersResponse).toEqual(firstUpdate);

      const secondUpdate: OrderResponse = {
        orders: [
          {
            _id: "second-order",
            ingredients: ["ingredient-2"],
            status: "done",
            name: "Second Order",
            createdAt: "2023-01-02T00:00:00.000Z",
            updatedAt: "2023-01-02T00:00:00.000Z",
            number: 3002,
          },
        ],
        success: true,
        total: 2,
        totalToday: 2,
      };

      state = ordersAllSlice.reducer(state, ordersAllOnMessage(secondUpdate));
      expect(state.ordersResponse).toEqual(secondUpdate);
    });
  });
});
