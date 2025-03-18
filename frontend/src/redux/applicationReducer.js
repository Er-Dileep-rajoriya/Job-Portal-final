import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    job: null,
  },
  reducers: {
    // actions
    setJob: (state, action) => {
      state.job = action.payload;
    },
  },
});

export const { setJob } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
