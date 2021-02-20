import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrgRepo, setPage } from "../features/repoSearch/SearchSlice";

import {
  makeStyles,
  Grid,
  Paper,
  ThemeProvider,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { green, purple } from "@material-ui/core/colors";

import RepoSearchForm from "../features/repoSearch/RepoSearchForm";
import RepoSearchInfo from "../features/repoSearch/RepoSearchInfo";
import IssuesListPage from "../features/issuesList/IssuesListPage";
import IssuesPages from "../features/issuesList/IssuesPages";

const useStyles = makeStyles({

  mainContainer: {
    flexDirection: "column",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingRight: "20px",
    paddingLeft: "20px",
  },

  headerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  growContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: "10px",
    paddingLeft: "30px",
    paddingRight: "10px",
    backgroundColor: green[300],
  },

  containerItem: {
    backgroundColor: green[900],
  },
});

const IssuesSearch = () => {
  const { org, repo, page } = useSelector((state) => state.search);
  const issues = useSelector((state) => state.issues);


  const dispatch = useDispatch();

  const setOrgAndRepo = (org, repo) => {
    dispatch(setOrgRepo({ org, repo }));
  };

  const setPageFunc = (page) => {
    dispatch(setPage({ page: page }));
  };

  // ===================================

  const themeType = useSelector((state) => state.theme.type);
  const isDark = useSelector((state) => state.theme.isDark);

  const theme = createMuiTheme({

    palette: {
      primary: purple,
      secondary: purple,
      type: themeType,
      text: {
        primary: !isDark ? "rgba(0, 0, 0, 0.87)" : "rgba(248, 245, 243, 0.87)",
      },

      background: {
        paper: isDark ? "#18191b" : "#ffffff",
      },
    },

  });

  const s = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper square={true} style={{ minHeight: "100vh" }}>
          <Grid container className={s.mainContainer}>
            <Grid item container classname={s.headerContainer}>
              <Grid item sm={12} md={6}>
                <RepoSearchForm
                  org={org}
                  repo={repo}
                  page={page}
                  setOrgAndRepo={setOrgAndRepo}
                  setPage={setPageFunc}
                  pageCount={issues.pageCount}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <RepoSearchInfo />
              </Grid>
            </Grid>
          </Grid>
          <IssuesListPage org={org} repo={repo} page={page} issues={issues} />
          <IssuesPages currentPage={page}
            pageCount={issues.pageCount} setPage={setPageFunc} />
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default IssuesSearch;
