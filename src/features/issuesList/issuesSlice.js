import { createSlice } from "@reduxjs/toolkit";

import { getIssue, getIssues } from "../api/gitHubApi";

function startLoading(state) {
  state.isLoading = true;
}

function loadingFailed(state, action) {
  state.isLoading = false;
  state.err = action.payload;
}

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    issuesByNumber: {},
    currentPageIssues: [],

    pageCount: 0,
    pageLinks: {},

    isLoading: false,
    err: null,
  },
  reducers: {
    getIssueStart: startLoading,
    getIssuesStart: startLoading,
    getIssueSuccess(state, { payload }) {
      const { number } = payload;
      state.issuesByNumber[number] = payload;
      state.isLoading = false;
      state.err = null;
    },

    getIssuesSuccess(state, { payload }) {
      const { pageCount, issues, pageLinks } = payload;
      state.pageCount = pageCount;
      state.pageLinks = pageLinks;
      state.isLoading = false;
      state.err = null;

      issues.forEach((issue) => {
        state.issuesByNumber[issue.number] = issue;
      });

      state.currentPageIssues = issues.map((issue) => issue.number);
    },

    getIssueFailure: loadingFailed,
    getIssuesFailure: loadingFailed,
  },
});

export const {
  getIssueStart,
  getIssuesStart,
  getIssueSuccess,
  getIssuesSuccess,
  getIssueFailure,
  getIssuesFailure,
} = issuesSlice.actions;

export default issuesSlice.reducer;

export const fetchIssue = (org, repo, number) => async (dispatch) => {
  try {
    dispatch(getIssueStart());
    const issue = await getIssue(org, repo, number);
    dispatch(getIssueSuccess(issue));
  } catch (err) {
    dispatch(getIssueFailure(err.toString()));
  }
};

export const fetchIssues = (org, repo, page) => async (dispatch) => {
  try {
    dispatch(getIssuesStart());
    const issues = await getIssues(org, repo, page);
    dispatch(getIssuesSuccess(issues));
  } catch (err) {
    dispatch(getIssuesFailure(err.toString()));
  }
};
