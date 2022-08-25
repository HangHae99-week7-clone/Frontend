import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";


export const postReviewFetch = createAsyncThunk(
  'review/postReview',
  async(payload, thunkAPI) => {
    try {
      const response = await instance.post(`/review/${payload.postId}`, payload)
      return thunkAPI.fulfillWithValue(response.data.reviews);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const putReviewFetch = createAsyncThunk(
  'review/putReview',
  async(payload, thunkAPI) => {
    try {
      const response = await instance.put(`/review/${payload.reviewId}`, payload)
      return thunkAPI.fulfillWithValue(response.data.result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const deleteReviewFetch = createAsyncThunk(
  'review/deleteReview',
  async(payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/review/${payload}`)
      return thunkAPI.fulfillWithValue(response.data.result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const reviewSlice = createSlice({
  name:"review",
  initialState: {
    result: false,
    reviews: []
  },
  extraReducers: builder => {
    builder.addCase(postReviewFetch.pending, (state, action) => {
      return state = action.payload;
    })
    builder.addCase(postReviewFetch.fulfilled, (state, action) => {
      const newState = {...state}
      newState.reviews = action.payload.sort((a, b) => b.reviewId - a.reviewId);
      return newState
    })
    builder.addCase(postReviewFetch.rejected, (state, action) => {
      return state = action.payload;
    })

    
    builder.addCase(deleteReviewFetch.pending, (state, action) => {
      return state.result = action.payload;
    })
    builder.addCase(deleteReviewFetch.fulfilled, (state, action) => {
      const newState = {...state}
      newState.result = action.payload.result;
      return newState
    })
    builder.addCase(deleteReviewFetch.rejected, (state, action) => {
      return state = action.payload;
    })


    builder.addCase(putReviewFetch.pending, (state, action) => {
      return state.result = action.payload;
    })
    builder.addCase(putReviewFetch.fulfilled, (state, action) => {
      const newState = {...state}
      newState.result = action.payload.result;
      return newState
    })
    builder.addCase(putReviewFetch.rejected, (state, action) => {
      return state = action.payload;
    })


    // builder.addCase(deleteReviewFetch.pending, (state, action) => {
    //   return state.result = action.payload;
    // })
    // builder.addCase(deleteReviewFetch.fulfilled, (state, action) => {
    //   const newState = {...state}
    //   newState.result = action.payload.result;
    //   return newState
    // })
    // builder.addCase(deleteReviewFetch.rejected, (state, action) => {
    //   return state = action.payload;
    // })
  }
})

export default reviewSlice;