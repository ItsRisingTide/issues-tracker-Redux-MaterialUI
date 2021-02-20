import { createSlice } from "@reduxjs/toolkit";

import { getRepoDetails } from "../api/gitHubApi";

const repoDetailsSlice = createSlice({
  name: "repoDetails",
  initialState: {
    openIssuesCount: -1,
    error: null,
  },
  reducers: {
    getRepoDetailsSuccess(state, action) {
      state.openIssuesCount = action.payload.open_issues_count;
      state.error = null;
    },

    getRepoDetailsFailed(state, action) {
      state.openIssuesCount = -1;
      state.error = action.payload;
    },
  },
});

export const {
  getRepoDetailsSuccess,
  getRepoDetailsFailed,
} = repoDetailsSlice.actions;

export default repoDetailsSlice.reducer;

export const fetchIssuesCount = (org, repo) => async (dispatch) => {
  //   try {
  //     const repoDetails = await getRepoDetails(org, repo);
  //     dispatch(getRepoDetailsSuccess(repoDetails));
  //   } catch (err) {
  //     dispatch(getRepoDetailsFailed(err.toString()));
  //   }

  getRepoDetails(org, repo).then(
    //success callback
    (repoDetails) => dispatch(getRepoDetailsSuccess(repoDetails)),

    //error callback
    (err) => dispatch(getRepoDetailsFailed(err.toString()))
  );
};
