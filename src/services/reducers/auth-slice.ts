import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "@/utils/api";
import { BASE_URL } from "../../constants";
import Cookies from "universal-cookie";
import { getProfile } from "./profile-slice";
import { RootState } from "../types";
import { LoadingState } from "@/types";

const cookies = new Cookies(null, { path: "/" });

interface AuthState {
  passwordResetStatus: LoadingState;
  passwordRecoveryStatus: LoadingState;
  authStatus: LoadingState;
}

const initialState: AuthState = {
  passwordResetStatus: "pending",
  passwordRecoveryStatus: "pending",
  authStatus: "pending",
};

// --- Интерфейс для параметров регистрации ---
interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

// --- Интерфейс для параметров логина ---
interface LoginParams {
  email: string;
  password: string;
}

// --- Интерфейс для параметров восстановления пароля ---
interface PasswordRecoveryParams {
  password: string;
  token: string;
}

// --- Экшен для регистрации пользователя ---
export const register = createAsyncThunk<void, RegisterParams>(
  "auth/register",
  async (params) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await checkResponse(response);

    cookies.set("accessToken", data.accessToken);
    cookies.set("refreshToken", data.refreshToken);
  }
);

// --- Экшен для сброса пароля ---
export const passwordReset = createAsyncThunk<void, string>(
  "auth/passwordReset",
  async (email) => {
    const response = await fetch(`${BASE_URL}/password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return checkResponse(response);
  }
);

// --- Экшен для восстановления пароля ---
export const passwordRecovery = createAsyncThunk<void, PasswordRecoveryParams>(
  "auth/passwordRecovery",
  async (params) => {
    const response = await fetch(`${BASE_URL}/password-reset/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    return checkResponse(response);
  }
);

// --- Экшен для логина ---
export const login = createAsyncThunk<void, LoginParams>(
  "auth/login",
  async (params) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await checkResponse(response);

    cookies.set("accessToken", data.accessToken);
    cookies.set("refreshToken", data.refreshToken);
  }
);

// --- Экшен для логаута ---
export const logout = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: cookies.get("refreshToken"),
      }),
    });

    cookies.remove("accessToken");
    cookies.remove("refreshToken");
  }
);

// --- Экшен для проверки авторизации ---
export const checkAuth = createAsyncThunk<void, void>(
  "auth/checkAuth",
  () => {
    const accessToken = cookies.get("accessToken");

    if (!accessToken) {
      throw new Error("Auth error");
    }
  }
);

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    reset: () => initialState,
  },
  extraReducers: ({ addCase }) => {
    addCase(passwordReset.pending, (state) => {
      state.passwordResetStatus = "pending";
    });
    addCase(passwordReset.fulfilled, (state) => {
      state.passwordResetStatus = "fulfilled";
    });
    addCase(passwordReset.rejected, (state) => {
      state.passwordResetStatus = "rejected";
    });

    addCase(passwordRecovery.pending, (state) => {
      state.passwordRecoveryStatus = "pending";
    });
    addCase(passwordRecovery.fulfilled, (state) => {
      state.passwordRecoveryStatus = "fulfilled";
    });
    addCase(passwordRecovery.rejected, (state) => {
      state.passwordRecoveryStatus = "rejected";
    });

    addCase(login.fulfilled, (state) => {
      state.authStatus = "fulfilled";
    });
    addCase(login.rejected, (state) => {
      state.authStatus = "rejected";
    });

    addCase(checkAuth.fulfilled, (state) => {
      state.authStatus = "fulfilled";
    });
    addCase(checkAuth.rejected, (state) => {
      state.authStatus = "rejected";
    });

    addCase(register.pending, (state) => {
      state.authStatus = "pending";
    });
    addCase(register.fulfilled, (state) => {
      state.authStatus = "fulfilled";
    });
    addCase(register.rejected, (state) => {
      state.authStatus = "rejected";
    });

    addCase(getProfile.rejected, (state) => {
      state.authStatus = "rejected";
    });

    addCase(logout.fulfilled, (state) => {
      state.authStatus = "rejected";
    });
  },
});

export const passwordResetStatusSelector = (state: RootState) =>
  state.auth.passwordResetStatus;
export const passwordRecoveryStatusSelector = (state: RootState) =>
  state.auth.passwordRecoveryStatus;
export const authStatusSelector = (state: RootState) => state.auth.authStatus;

export const { reset } = authSlice.actions;
export default authSlice.reducer;
