import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

const initialState = {
  result: [],
  isLoading: false,
  error: null,
  data: {}
};

//검색 결과 GET 요청
export const __getKeywordSearch = createAsyncThunk("get/search", async (keyword, thunkAPI) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/post/search?keyword=${keyword}`);
    return thunkAPI.fulfillWithValue(data.Result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});


export const getDetailPageFetch = createAsyncThunk(
  "get/detail", 
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/post/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
    [getDetailPageFetch.fulfilled]: (state, action) => {
      // state.isLoading = false;
      state.data = action.payload;
      state.data.review = action.payload.review.sort((a, b) => b.reviewId - a.reviewId);
    },
  },
});

export default searchSlice.reducer;
