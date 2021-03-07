import React, { useEffect } from "react";
//
import { Typography, Grid, ThemeProvider, Paper } from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
//
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//
import { fetchComments } from "../features/issueDetails/commentsSlice";
import { fetchIssue } from "../features/issuesList/issuesSlice";
//
import IssueMeta from "../features/issueDetails/IssueMeta";
import IssueTimeline from "../features/issueDetails/IssueTimeline";
import { setTheme } from "./themeSlice";

const IssueInfo = () => {
  const dispatch = useDispatch();
  let { issueId } = useParams();
  const issue = useSelector((state) => state.issues.issuesByNumber[issueId]);
  const { org, repo, page } = useSelector((state) => state.search);

  // const comments = useSelector((state) => state.issues.issuesByNumber[issueId]);

  // const commentsLoading = useSelector(
  //   (state) => state.issues.issuesByNumber[issueId]
  // );

  // const commentsError = useSelector(
  //   (state) => state.issues.issuesByNumber[issueId]
  // );

  useEffect(() => {
    if (!issue) {
      dispatch(fetchIssue(org, repo, issueId));
    }

    // Since we may have the issue already, ensure we're scrolled to the top
    window.scrollTo({ top: 0 });
  }, [org, repo, issueId, issue, dispatch]);

  useEffect(() => {
    if (issue) {
      dispatch(fetchComments(issue));
    }
  }, [issue, dispatch]);

  useEffect(() => {
    dispatch(setTheme(theme));
  });
  //===========================

  const themeType = useSelector((state) => state.theme.type);
  const isDark = useSelector((state) => state.theme.isDark);

  let theme = createMuiTheme({
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
    typography: {
      // // In Chinese and Japanese the characters are usually larger,
      // // so a smaller fontsize may be appropriate.
      // fontSize: 14,
      // Tell Material-UI what's the font-size on the html element is.
      // htmlFontSize: 18,
      // allVariants: {
      //   color: isDark ? "rgba(0, 0, 0, 0.87)" : "rgba(248, 245, 243, 0.87)",
      // },

      h4: {
        fontSize: "1.875rem",
      },
    },
  });

  theme = responsiveFontSizes(theme);

  const useStyles = makeStyles({
    mainContainer: {
      flexDirection: "column",
      paddingRight: "20px",
      paddingLeft: "20px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  });

  const s = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper square={true} style={{ minHeight: "100vh" }}>
          {!issue && <Typography>Issue {issueId} is loading ...</Typography>}
          {issue && (
            <Paper>
              <Grid className={s.mainContainer}>
                <IssueMeta {...issue} />
                <IssueTimeline />
                <Typography> IssueInfo : {issueId}</Typography>
              </Grid>
            </Paper>
          )}
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default IssueInfo;
