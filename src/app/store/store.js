import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../module/LoginSlice";
import search from "../module/SearchSlice";

export const store = configureStore({
  reducer: {
    login: LoginSlice.reducer,
    search,
  },
});
