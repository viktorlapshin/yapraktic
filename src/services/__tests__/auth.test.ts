import {
  authSlice,
  initialState,
  login,
  register,
  logout,
  checkAuth,
  passwordReset,
  passwordRecovery,
  reset,
} from "../reducers/auth-slice";
import { getProfile } from "../reducers/profile-slice";

describe("Redux store and actions", () => {
  it("should return the initial state", () => {
    expect(authSlice.reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should return state with loginError after login error action", () => {
    const email = "test@test.com";
    expect(
      authSlice.reducer(undefined, {
        type: login.fulfilled.type,
        payload: { email },
      })
    ).toEqual({
      ...initialState,
      authStatus: "fulfilled",
    });
  });
});

describe("Auth slice tests", () => {
  describe("Initial state", () => {
    it("should return the initial state", () => {
      expect(authSlice.reducer(undefined, { type: "" })).toEqual(initialState);
    });
  });

  describe("Reset action", () => {
    it("should reset state to initial state", () => {
      const modifiedState = {
        passwordResetStatus: "fulfilled" as const,
        passwordRecoveryStatus: "rejected" as const,
        authStatus: "fulfilled" as const,
      };

      expect(authSlice.reducer(modifiedState, reset())).toEqual(initialState);
    });
  });

  describe("Register action", () => {
    it("should set authStatus to pending when register is pending", () => {
      expect(
        authSlice.reducer(initialState, {
          type: register.pending.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "pending",
      });
    });

    it("should set authStatus to fulfilled when register is fulfilled", () => {
      expect(
        authSlice.reducer(initialState, {
          type: register.fulfilled.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "fulfilled",
      });
    });

    it("should set authStatus to rejected when register is rejected", () => {
      expect(
        authSlice.reducer(initialState, {
          type: register.rejected.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "rejected",
      });
    });
  });

  describe("Login action", () => {
    it("should set authStatus to fulfilled when login is fulfilled", () => {
      expect(
        authSlice.reducer(initialState, {
          type: login.fulfilled.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "fulfilled",
      });
    });

    it("should set authStatus to rejected when login is rejected", () => {
      expect(
        authSlice.reducer(initialState, {
          type: login.rejected.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "rejected",
      });
    });
  });

  describe("Logout action", () => {
    it("should set authStatus to rejected when logout is fulfilled", () => {
      const authenticatedState = {
        ...initialState,
        authStatus: "fulfilled" as const,
      };

      expect(
        authSlice.reducer(authenticatedState, {
          type: logout.fulfilled.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "rejected",
      });
    });
  });

  describe("CheckAuth action", () => {
    it("should set authStatus to fulfilled when checkAuth is fulfilled", () => {
      expect(
        authSlice.reducer(initialState, {
          type: checkAuth.fulfilled.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "fulfilled",
      });
    });

    it("should set authStatus to rejected when checkAuth is rejected", () => {
      expect(
        authSlice.reducer(initialState, {
          type: checkAuth.rejected.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "rejected",
      });
    });
  });

  describe("PasswordReset action", () => {
    it("should set passwordResetStatus to pending when passwordReset is pending", () => {
      expect(
        authSlice.reducer(initialState, {
          type: passwordReset.pending.type,
        })
      ).toEqual({
        ...initialState,
        passwordResetStatus: "pending",
      });
    });

    it("should set passwordResetStatus to fulfilled when passwordReset is fulfilled", () => {
      expect(
        authSlice.reducer(initialState, {
          type: passwordReset.fulfilled.type,
        })
      ).toEqual({
        ...initialState,
        passwordResetStatus: "fulfilled",
      });
    });

    it("should set passwordResetStatus to rejected when passwordReset is rejected", () => {
      expect(
        authSlice.reducer(initialState, {
          type: passwordReset.rejected.type,
        })
      ).toEqual({
        ...initialState,
        passwordResetStatus: "rejected",
      });
    });
  });

  describe("PasswordRecovery action", () => {
    it("should set passwordRecoveryStatus to pending when passwordRecovery is pending", () => {
      expect(
        authSlice.reducer(initialState, {
          type: passwordRecovery.pending.type,
        })
      ).toEqual({
        ...initialState,
        passwordRecoveryStatus: "pending",
      });
    });

    it("should set passwordRecoveryStatus to fulfilled when passwordRecovery is fulfilled", () => {
      expect(
        authSlice.reducer(initialState, {
          type: passwordRecovery.fulfilled.type,
        })
      ).toEqual({
        ...initialState,
        passwordRecoveryStatus: "fulfilled",
      });
    });

    it("should set passwordRecoveryStatus to rejected when passwordRecovery is rejected", () => {
      expect(
        authSlice.reducer(initialState, {
          type: passwordRecovery.rejected.type,
        })
      ).toEqual({
        ...initialState,
        passwordRecoveryStatus: "rejected",
      });
    });
  });

  describe("GetProfile action", () => {
    it("should set authStatus to rejected when getProfile is rejected", () => {
      const authenticatedState = {
        ...initialState,
        authStatus: "fulfilled" as const,
      };

      expect(
        authSlice.reducer(authenticatedState, {
          type: getProfile.rejected.type,
        })
      ).toEqual({
        ...initialState,
        authStatus: "rejected",
      });
    });
  });
});
