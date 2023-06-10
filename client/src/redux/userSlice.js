import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
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
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    register: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
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
