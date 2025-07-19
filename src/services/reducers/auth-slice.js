
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/check-response";
import { BASE_URL } from "../../constants";

const initialState = {
    passwordResetStatus: 'pending',
    passwordRecoveryStatus: 'pending',
    authStatus: 'pending'
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
    // const response = await fetch(`${BASE_URL}/login`, { method: "POST", body: JSON.stringify(params) })

    // checkResponse(response)

    // const data = await response.json()

    return {data: 'test'}
  }
);

export const checkAuth = createAsyncThunk("auth/checkAuth", () => {
  throw new Error('')
})

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

        addCase(login.fulfilled, (state, action) => {
            state.authStatus = "fulfilled"
        })

        addCase(login.rejected, (state, action) => {
            state.authStatus = "rejected"
        })

        addCase(checkAuth.fulfilled, (state, action) => {
            state.authStatus = "fulfilled"
        })

        addCase(checkAuth.rejected, (state, action) => {
            state.authStatus = "rejected"
        })
    }
})

export const passwordResetStatusSelector = (state) => state.auth.passwordResetStatus
export const passwordRecoveryStatusSelector = (state) => state.auth.passwordRecoveryStatus
export const authStatusSelector = (state) => state.auth.authStatus
// POST https://norma.nomoreparties.space/api/auth/login - эндпоинт для авторизации.
// POST https://norma.nomoreparties.space/api/auth/register - эндпоинт для регистрации пользователя.
// POST https://norma.nomoreparties.space/api/auth/logout - эндпоинт для выхода из системы.
// POST https://norma.nomoreparties.space/api/auth/token - эндпоинт обновления токена.