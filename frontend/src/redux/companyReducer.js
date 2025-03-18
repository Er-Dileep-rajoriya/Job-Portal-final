import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singleCompany: null,
  allCompanies: [],
  searchCompanyByText: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setAllCompanies: (state, action) => {
      state.allCompanies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
  },
});

export const { setSingleCompany, setAllCompanies, setSearchCompanyByText } =
  companySlice.actions;
export const companyReducer = companySlice.reducer;
