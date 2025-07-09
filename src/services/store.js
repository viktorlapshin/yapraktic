import { configureStore } from '@reduxjs/toolkit'
import { ingredientsSlice } from './reducers/ingredients-slice'

export const store = configureStore({
  reducer: {
    ingredientsSlice: ingredientsSlice.reducer
  },
})