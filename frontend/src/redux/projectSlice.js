import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProject: null,
  projects: [],
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
    fetchAllProjectsStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchAllProjectsSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    },
    fetchAllProjectsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    addProjectStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    addProjectSuccess: (state, action) => {
      state.loading = false;
      state.projects.push(action.payload);
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
      state.projects = state.projects.map((project) =>
        project._id === action.payload._id ? action.payload : project
      );
    },
    updateProjectFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteProjectStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    deleteProjectSuccess: (state, action) => {
      state.loading = false;
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
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
  fetchAllProjectsStart,
  fetchAllProjectsSuccess,
  fetchAllProjectsFailure,
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
