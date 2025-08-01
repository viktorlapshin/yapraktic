import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/check-response";
import { BASE_URL } from "../../constants";
import Cookies from "universal-cookie";
import { getProfile } from "./profile-slice";

const cookies = new Cookies(null, { path: '/' })

const initialState = {
    passwordResetStatus: 'pending',
    passwordRecoveryStatus: 'pending',
    authStatus: 'pending'
};

// Экшен для регистрации пользователя
export const register = createAsyncThunk(
  "auth/register",
  async (params) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    
    const data = await checkResponse(response);

    cookies.set("accessToken", data.accessToken)
    cookies.set("refreshToken", data.refreshToken)
  }
);

export const passwordReset = createAsyncThunk(
  "auth/passwordReset",
  async (email) => {
    return fetch(`${BASE_URL}/password-reset`, { method: "POST", body: JSON.stringify({ email }) }).then(checkResponse);
  }
);

export const passwordRecovery = createAsyncThunk(
  "auth/passwordRecovery",
  async (params) => {
    return fetch(`${BASE_URL}/password-reset/reset`, { method: "POST", body: JSON.stringify(params) }).then(checkResponse);
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (params) => {
    const response = await fetch(`${BASE_URL}/auth/login`, { method: "POST", body: JSON.stringify(params) })

    const data = await checkResponse(response)
    
    cookies.set("accessToken", data.accessToken)
    cookies.set("refreshToken", data.refreshToken)
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    const response = await fetch(`${BASE_URL}/auth/logout`, { method: "POST", body: JSON.stringify({
      token: cookies.get("refreshToken")
    }) })

    cookies.remove("accessToken")
    cookies.remove("refreshToken")
  }
);

export const checkAuth = createAsyncThunk("auth/checkAuth", () => {
  const accessToken = cookies.get("accessToken")
  const refreshToken = cookies.get("refreshToken")

  if (!accessToken) {
    throw new Error('Auth error')
  }
});

export const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        reset: () => initialState
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

        // Регистрация
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

        addCase(logout.fulfilled, (state, action) => {
          state.authStatus = "rejected";
        })
    }
});

export const passwordResetStatusSelector = (state) => state.auth.passwordResetStatus;
export const passwordRecoveryStatusSelector = (state) => state.auth.passwordRecoveryStatus;
export const authStatusSelector = (state) => state.auth.authStatus;

export const { reset } = authSlice.actions;
export default authSlice.reducer;

// Экшен register уже экспортирован выше как export const register
