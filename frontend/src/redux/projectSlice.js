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
      state.error = false;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentProject = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addProjectStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    addProjectSuccess: (state, action) => {
      state.loading = false;
      state.currentProject = action.payload;
    },
    addProjectFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateProjectStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    updateProjectSuccess: (state, action) => {
      state.loading = false;
      state.currentProject = action.payload; 
    },
    updateProjectFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteProjectStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteProjectSuccess: (state) => {
      state.loading = false;
      state.currentProject = null;
    },
    deleteProjectFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  addProjectStart,
  addProjectSuccess,
  addProjectFailure,
  updateProjectStart,
  updateProjectSuccess,
  updateProjectFailure,
  deleteProjectStart,
  deleteProjectSuccess,
  deleteProjectFailure,
} = projectSlice.actions;

export default projectSlice.reducer;
