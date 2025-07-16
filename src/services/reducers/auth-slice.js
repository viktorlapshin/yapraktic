
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/check-response";
import { BASE_URL } from "../../constants";

const initialState = {
    passwordResetStatus: 'pending',
    passwordRecoveryStatus: 'pending'
}

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
    return fetch(`${BASE_URL}/login`, { method: "POST", body: JSON.stringify(params) }).then(checkResponse);
  }
);

export const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        reset: () => initialState
    },
    extraReducers: ({ addCase }) => {
        addCase(passwordReset.pending, (state, action) => {
            state.passwordResetStatus = "pending"
        })

        addCase(passwordReset.fulfilled, (state, action) => {
            state.passwordResetStatus = "fulfilled"
        })

        addCase(passwordReset.rejected, (state, action) => {
            state.passwordResetStatus = "rejected"
        })

        addCase(passwordRecovery.pending, (state, action) => {
            state.passwordRecoveryStatus = "pending"
        })

        addCase(passwordRecovery.fulfilled, (state, action) => {
            state.passwordRecoveryStatus = "fulfilled"
        })

        addCase(passwordRecovery.rejected, (state, action) => {
            state.passwordRecoveryStatus = "rejected"
        })
    }
})

export const passwordResetStatusSelector = (state) => state.auth.passwordResetStatus
export const passwordRecoveryStatusSelector = (state) => state.auth.    passwordRecoveryStatus
// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.