import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "./instance";

const initialState = {
  result: [],
  isLoading: false,
  error: null,
  data: {},
};

//모든 숙소 결과 GET 요청
export const __getAllSearch = createAsyncThunk("get/allsearch", async (_, thunkAPI) => {
  try {
    const { data } = await instance.get("/post");
    return thunkAPI.fulfillWithValue(data.Result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

//검색 결과 GET 요청
export const __getKeywordSearch = createAsyncThunk("get/search", async (keyword, thunkAPI) => {
  try {
    const { data } = await instance.get(`/post/search?keyword=${keyword}`);
    return thunkAPI.fulfillWithValue(data.Result);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getDetailPageFetch = createAsyncThunk("get/detail", async (payload, thunkAPI) => {
  try {
    const response = await instance.get(`/post/${payload}`);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteDetailPageFetch = createAsyncThunk("delete/detail", async (payload, thunkAPI) => {
  try {
    const response = await instance.delete(`/post/${payload}`);
    console.log(response)
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //도든 숙소 결과 조회
    [__getAllSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [__getAllSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.result = action.payload;
    },
    [__getAllSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

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

    //상세 정보 가져오기
    [getDetailPageFetch.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getDetailPageFetch.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.data.review = action.payload.review.sort((a, b) => b.reviewId - a.reviewId);
    },
    [getDetailPageFetch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //작성된 글 삭제하기
    [deleteDetailPageFetch.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteDetailPageFetch.fulfilled]: (state, action) => {
      // state.isLoading = false;
      window.location.assign('/')
    },
    [deleteDetailPageFetch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default searchSlice.reducer;
