import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "./../api/api";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    type: null,
    phonenumber: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOtp.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.phoneNumber = data.phoneNumber;
        state.userId = data.userId;
        state.type = data.type;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.phoneNumber = data.phoneNumber;
        state.userId = data.userId;
        state.type = data.type;
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userType", data.type);
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const { data } = action.payload;
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userType", data.type);
      })
      .addCase(hustlerLogin.fulfilled, (state, action) => {
        const { data } = action.payload;
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userType", data.type);
      });
  },
});

export default authSlice.reducer;

export const getOtp = createAsyncThunk(
  "users/getOtp",
  async (phoneNumber, { rejectWithValue }) => {
    try {
      const response = await userAPI.generateOtp(phoneNumber);
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userRegister = createAsyncThunk(
  "users/userRegister",
  async ({ phoneNumber, otp }, { rejectWithValue }) => {
    try {
      const response = await userAPI.userRegister(phoneNumber, { otp });
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "users/userLogin",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await userAPI.userLogin(userId, { otp, type: 0 });
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const hustlerLogin = createAsyncThunk(
  "users/hustlerLogin",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await userAPI.userLogin(userId, { otp, type: 1 });
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
