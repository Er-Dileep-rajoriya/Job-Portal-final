import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  singleJob: null,
  adminJobs: [],
  searchText: "",
  allAppliedJobs: [],
  searchedJobText: "",
};

const jobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    // actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedJobText: (state, action) => {
      state.searchedJobText = action.payload;
    },
    addNewJob: (state, action) => {
      state.adminJobs.unshift(action.payload);
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAdminJobs,
  setSearchText,
  setAllAppliedJobs,
  setSearchedJobText,
  addNewJob,
} = jobSlice.actions;
export const jobReducer = jobSlice.reducer;
