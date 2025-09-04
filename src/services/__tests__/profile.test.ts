import {
  profileSlice,
  getProfile,
  editProfile,
  initialState,
} from "../reducers/profile-slice";
import { User } from "@/types";

const mockUser: User = {
  email: "test@example.com",
  name: "Test User",
};

const mockUserResponse = {
  user: mockUser,
  success: true,
};

describe("Profile slice tests", () => {
  describe("Initial state", () => {
    it("should return the initial state", () => {
      expect(profileSlice.reducer(undefined, { type: "" })).toEqual(
        initialState
      );
    });
  });

  describe("Reset action", () => {
    it("should reset state to initial state", () => {
      const stateWithUser = {
        user: mockUser,
      };

      expect(
        profileSlice.reducer(stateWithUser, profileSlice.actions.reset())
      ).toEqual(initialState);
    });
  });

  describe("SetUser action", () => {
    it("should set user in state", () => {
      expect(
        profileSlice.reducer(
          initialState,
          profileSlice.actions.setUser(mockUser)
        )
      ).toEqual({
        user: mockUser,
      });
    });

    it("should replace existing user", () => {
      const stateWithUser = {
        user: { email: "old@example.com", name: "Old User" },
      };

      expect(
        profileSlice.reducer(
          stateWithUser,
          profileSlice.actions.setUser(mockUser)
        )
      ).toEqual({
        user: mockUser,
      });
    });
  });

  describe("GetProfile async thunk", () => {
    it("should set user when getProfile is fulfilled", () => {
      expect(
        profileSlice.reducer(initialState, {
          type: getProfile.fulfilled.type,
          payload: mockUserResponse,
        })
      ).toEqual({
        user: mockUser,
      });
    });

    it("should update existing user when getProfile is fulfilled", () => {
      const stateWithUser = {
        user: { email: "old@example.com", name: "Old User" },
      };

      expect(
        profileSlice.reducer(stateWithUser, {
          type: getProfile.fulfilled.type,
          payload: mockUserResponse,
        })
      ).toEqual({
        user: mockUser,
      });
    });
  });

  describe("EditProfile async thunk", () => {
    it("should set user when editProfile is fulfilled", () => {
      expect(
        profileSlice.reducer(initialState, {
          type: editProfile.fulfilled.type,
          payload: mockUser,
        })
      ).toEqual({
        user: mockUser,
      });
    });

    it("should update existing user when editProfile is fulfilled", () => {
      const oldUser = { email: "old@example.com", name: "Old User" };
      const stateWithUser = { user: oldUser };

      const updatedUser = {
        email: "updated@example.com",
        name: "Updated User",
      };

      expect(
        profileSlice.reducer(stateWithUser, {
          type: editProfile.fulfilled.type,
          payload: updatedUser,
        })
      ).toEqual({
        user: updatedUser,
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle multiple actions in sequence", () => {
      let state = profileSlice.reducer(initialState, { type: "" });
      expect(state.user).toBeNull();

      state = profileSlice.reducer(
        state,
        profileSlice.actions.setUser(mockUser)
      );
      expect(state.user).toEqual(mockUser);

      const updatedUser = {
        email: "updated@example.com",
        name: "Updated User",
      };
      state = profileSlice.reducer(state, {
        type: getProfile.fulfilled.type,
        payload: { user: updatedUser },
      });
      expect(state.user).toEqual(updatedUser);

      const editedUser = { email: "edited@example.com", name: "Edited User" };
      state = profileSlice.reducer(state, {
        type: editProfile.fulfilled.type,
        payload: editedUser,
      });
      expect(state.user).toEqual(editedUser);

      state = profileSlice.reducer(state, profileSlice.actions.reset());
      expect(state).toEqual(initialState);
    });

    it("should handle unknown actions gracefully", () => {
      const stateWithUser = { user: mockUser };

      expect(
        profileSlice.reducer(stateWithUser, { type: "unknown/action" })
      ).toEqual(stateWithUser);
    });
  });
});
