import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import instance from "./instance";


export const signUpFetch = createAsyncThunk(
  'user/signup',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post('/user/signup', payload)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)


export const loginFetch = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post('/user/login', payload)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)


export const nicknameChangeFetch = createAsyncThunk(
  'user/nicknameChange',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put('/user/nicknamechange', payload)
      return thunkAPI.fulfillWithValue({result: response.data.result, nickname: payload.nicknamechange});
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)


export const withdrawFetch = createAsyncThunk(
  'user/withdraw',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/user/delete`, { 
        data: { 
          password: payload.password 
        },
        withCredentials: true,
      })
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)


const userSlice = createSlice({
  name: "user",
  initialState: {
    result: "",
    error: "",
    token: "",
    email: "",
    nickname: "",
    userId: ""
  },
  reducers: {
    currentUser: (state, action) => {
      state.email = action.payload.email
      state.nickname = action.payload.nickname
      state.userId = Number(action.payload.userId)
    }
  },
  extraReducers: builder => {
    builder.addCase(signUpFetch.pending, (state, action) => {
      return state;
    })
    builder.addCase(signUpFetch.fulfilled, (state, action) => {
      const newState = { ...state, 
        result: action.payload.result, 
        error: action.payload.error 
      }
      return newState;
    })
    builder.addCase(signUpFetch.rejected, (state, action) => {
      const newState = { 
        ...state, result: action.payload.result, 
        error: action.payload.error 
      }
      return newState;
    })


    builder.addCase(loginFetch.pending, (state, action) => {
      return state;
    })
    builder.addCase(loginFetch.fulfilled, (state, action) => {
      window.localStorage.setItem("token", action.payload.token)
      window.localStorage.setItem("email", action.payload.email)
      window.localStorage.setItem("nickname", action.payload.nickname)
      window.localStorage.setItem("userId", action.payload.userId)
      const newState = {
        ...state,
        result: action.payload.result,
        error: action.payload.error
      }
      return newState;
    })
    builder.addCase(loginFetch.rejected, (state, action) => {
      const newState = { ...state, 
        result: action.payload.result, 
        error: action.payload.error 
      }
      return newState;
    })


    builder.addCase(nicknameChangeFetch.pending, (state, action) => {
      return state;
    })
    builder.addCase(nicknameChangeFetch.fulfilled, (state, action) => {
      window.localStorage.setItem("nickname", action.payload.nickname)
      const newState = { ...state, 
        result: action.payload.result, 
        error: action.payload.error,
        nickname: action.payload.nickname
      }
      return newState;
    })
    builder.addCase(nicknameChangeFetch.rejected, (state, action) => {
      const newState = { ...state, 
        result: action.payload.result, 
        error: action.payload.error 
      }
      return newState;
    })


    builder.addCase(withdrawFetch.pending, (state, action) => {
      return state;
    })
    builder.addCase(withdrawFetch.fulfilled, (state, action) => {
      window.localStorage.clear();
      return state = {...state, result: action.payload.result};
    })
    builder.addCase(withdrawFetch.rejected, (state, action) => {
      const newState = { ...state, 
        result: action.payload.result, 
        error: action.payload.error 
      }
      return newState;
    })
  }
})

export default userSlice;
