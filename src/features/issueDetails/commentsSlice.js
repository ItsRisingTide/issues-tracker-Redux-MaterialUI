import { createSlice } from "@reduxjs/toolkit";
import { getComments } from "../api/gitHubApi";

// const initialState = {
//   commentsByIssue: {},
//   loading: false,
//   error: null,
// };

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    commentsByIssue: {},
    loading: false,
    error: null,
  },
  reducers: {
    getCommentsStart(state) {
      state.loading = true;
      state.error = null;
    },

    getCommnetsSuccess(state, action) {
      const { comments, issueId } = action.payload;
      state.commentsByIssue[issueId] = comments;
      state.loading = false;
      state.error = null;
    },

    getCommentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchComments = (issue) => async (dispatch) => {
  try {
    dispatch(getCommentsStart());
    const comments = await getComments(issue.comments_url);
    dispatch(getCommnetsSuccess({ issueId: issue.number, comments }));
  } catch (err) {
    dispatch(getCommentsFailure(err));
  }
};

export const {
  getCommentsStart,
  getCommnetsSuccess,
  getCommentsFailure,
} = commentsSlice.actions;

export default commentsSlice.reducer;
