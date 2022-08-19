import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from '../module/LoginSlice';

export const store = configureStore({
  reducer: {
    login: LoginSlice.reducer,
  },
});
