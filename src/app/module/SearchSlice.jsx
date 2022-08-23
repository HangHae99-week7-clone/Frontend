import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

const initialState = {
  result: [],
  isLoading: false,
  error: null,
};

//검색 결과 GET 요청
export const __getKeywordSearch = createAsyncThunk("get/search", async (keyword, thunkAPI) => {
  try {
    const { data } = await instance.get(`/post/search?keyword=${keyword}`);
    return thunkAPI.fulfillWithValue(data.Result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //검색 결과 조회
    [__getKeywordSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getKeywordSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.result = action.payload;
    },
    [__getKeywordSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default searchSlice.reducer;
