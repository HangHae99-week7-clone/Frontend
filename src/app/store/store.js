import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../module/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
