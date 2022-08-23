import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../module/userSlice";
import search from "../module/SearchSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search,
  },
});
