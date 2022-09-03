import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "./../api/api";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    userId: null,
    type: null,
    user: null,
    hustler: null,
    location: null,
  },
  reducers: {
    clearProfile(state, action) {
      state.user = null;
      state.userId = null;
      state.type = null;
      state.hustler = null;
      state.location = null;
    },
    addLocation(state, action) {
      const { location } = action.payload;
      state.location = location;
    },
    addUser(state, action) {
      const { data } = action.payload;
      state.user = data;
      state.userId = data.userId;
      state.type = data.type;
      state.location = data.location;
    },
    addNewUser(state, action) {
      const { data } = action.payload;
      state.user = data;
      state.userId = data.userId;
      state.type = data.type;
      state.location = null;
    },
    addHustler(state, action) {
      const { data } = action.payload;
      state.hustler = data;
      state.userId = data.userId;
      state.type = data.type;
      state.location = data.location;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.user = data;
        state.userId = data.userId;
        state.type = data.type;
        state.location = data.location;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.user = data;
        state.userId = data.userId;
        state.type = data.type;
        state.location = data.location;
      })
      .addCase(createHustler.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.hustler = data;
        state.userId = data.userId;
        state.type = data.type;
        state.location = data.location;
        state.user = null;
        localStorage.setItem("userType", data.type);
      })
      .addCase(getHustler.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.hustler = data;
        state.userId = data.userId;
        state.type = data.type;
        state.location = data.location;
      })
      .addCase(editHustler.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.hustler = data;
        state.userId = data.userId;
        state.type = data.type;
        state.user = null;
        state.location = data.location;
      });
  },
});
export const { clearProfile, addLocation, addUser, addNewUser, addHustler } =
  profileSlice.actions;

export default profileSlice.reducer;

export const getUser = createAsyncThunk(
  "users/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userAPI.getUser(userId);
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await userAPI.editUser(userId, data);
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createHustler = createAsyncThunk(
  "users/createHustler",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await userAPI.createHustler(userId, data);
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getHustler = createAsyncThunk(
  "users/getHustler",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await userAPI.getHustler(userId);
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editHustler = createAsyncThunk(
  "users/editHustler",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await userAPI.editHustler(userId, data);
      return { data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
