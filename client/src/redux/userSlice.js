// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "user";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

const loadUserFromStorage = () => {
  const storedUser = localStorage.getItem(STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      localStorage.removeItem(STORAGE_KEY);
    },
    register: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
    },
    registerFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  register,
  registerFailure,
  registerSuccess,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;

