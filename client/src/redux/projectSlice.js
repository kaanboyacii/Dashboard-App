import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProject: null,
  loading: false,
  error: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentProject = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteProjectSuccess: (state) => {
      state.currentProject = null; // Silinen proje null olarak güncelleniyor
    },
    deleteProjectFailure: (state) => {
      state.error = true; // Silme hatası durumunu güncelliyor
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, deleteProjectSuccess, deleteProjectFailure } =
  projectSlice.actions;

export default projectSlice.reducer;

