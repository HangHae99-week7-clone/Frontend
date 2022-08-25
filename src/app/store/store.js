import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../module/userSlice";
import search from "../module/SearchSlice";
import reviewSlice from "../module/reviewSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    search,
    review:reviewSlice.reducer
  },
});
