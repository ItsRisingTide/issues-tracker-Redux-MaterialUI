import { combineReducers } from "redux";
import themeReducer from "../pages/themeSlice";
import searchReducer from "../features/repoSearch/SearchSlice";
import repoDetailsReducer from "../features/repoSearch/repoDetailsSlice";
import issuesReducer from "../features/issuesList/issuesSlice";
import commentsReducer from "../features/issueDetails/commentsSlice";

export default combineReducers({
  theme: themeReducer,
  search: searchReducer,
  repoDetails: repoDetailsReducer,
  issues: issuesReducer,
  comments: commentsReducer,
});
