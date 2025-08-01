import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import Cookies from "universal-cookie";
import { fetchWithRefresh } from "../../utils/api";

const cookies = new Cookies(null, { path: '/' })

const initialState = {
    user: null
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async () => {
    const headers = new Headers()
    headers.append('Authorization', cookies.get('accessToken'))

    const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, { method: "GET", headers })

    return response
  }
);

export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (params) => {
    const headers = new Headers()
    headers.append('Authorization', cookies.get('accessToken'))

    const response = await fetchWithRefresh(`${BASE_URL}/auth/user`, { method: "PATCH", headers, body: JSON.stringify(params) })

    return response
  }
);

export const profileSlice = createSlice({
    initialState,
    name: 'profile',
    reducers: {
        reset: () => initialState,
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(getProfile.fulfilled, (state, action) => {
          state.user = action.payload.user
        })

        addCase(editProfile.fulfilled, (state, action) => {
          state.user = action.payload
        })
    }
});

export const userSelector = (state) => state.profile.user