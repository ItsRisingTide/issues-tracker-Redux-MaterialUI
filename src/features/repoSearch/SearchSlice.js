import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    org: "rails",
    repo: "rails",
    page: 1,
  },
  reducers: {
    setOrgRepo(state, action) {
      const { org, repo } = action.payload;
      return (state = { org: org, repo: repo, page: state.page });
    },

    setPage(state, action) {
      const { page } = action.payload;
      return (state = { ...state, page: page });
    },
  },
});

export const { setOrgRepo, setPage } = searchSlice.actions;
export default searchSlice.reducer;
