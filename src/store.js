import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/slices/authSlice";
import profileSlice from "./components/slices/profileSlice";

export const store = configureStore({
  reducer: { auth: authReducer, profile: profileSlice },
});
