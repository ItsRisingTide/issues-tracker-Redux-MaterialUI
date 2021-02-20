import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Loading from "./Loading";
import IssuesList from "./IssuesList";
import IssuesListHeader from "./IssuesListHeader";

import { useDispatch, useSelector } from "react-redux";
import { fetchIssuesCount } from "../repoSearch/repoDetailsSlice";

import { fetchIssues } from "../issuesList/issuesSlice";

const useStyles = makeStyles({
  mainContainer: {
    flexDirection: "column",
    paddingRight: "20px",
    paddingLeft: "20px",
  },
});

const IssuesListPage = () => {
  const { org, repo, page } = useSelector((state) => state.search);
  const { openIssuesCount, error } = useSelector((state) => state.repoDetails);
  const { issuesByNumber, currentPageIssues, isLoading } = useSelector(
    (state) => state.issues
  );
  // const issues = currentPageIssues.map((number) => issuesByNumber[number]);
  const dispatch = useDispatch();

  const [isTimeout, setIsTimeOut] = useState(false);

  useEffect(() => {
    // async function fetchEverything() {
    //   async function fetchIssues() {
    //     const issues = await getIssues(org, repo, page);
    //     setIssues(issues);
    //   }

    //   // async function fetchIssuesCount() {
    //   //   const issuesCnt = await getRepoDetails(org, repo);
    //   //   setIssuesCount(issuesCnt.open_issues_count);
    //   // }

    //   try {
    //     setTimeout(() => setIsTimeOut(false), 2100);
    //     await Promise.all([
    //       fetchIssues(),
    //       dispatch(fetchIssuesCount(org, repo)),
    //     ]);
    //     setIssuesError(null);
    //   } catch (err) {
    //     console.log(err);
    //     // console.log(err.response.status);
    //     // console.log(err.response.data);
    //     // console.log(err.response.headers);
    //     setIssuesError(err);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    // fetchEverything();

    // return () => {
    //   console.log(`Clean up func`);
    // };
    dispatch(fetchIssues(org, repo, page));
    dispatch(fetchIssuesCount(org, repo));
  }, [org, repo, page]);

  const s = useStyles();

  // console.log(`fetched issues: ${issuesByNumber}`);
  // console.log(`fetch numIssues: ${openIssuesCount}`);
  // console.log(`fetched err: ${error}`);

  return (
    <>
      {isLoading && (
        <Grid item container>
          <Loading />
        </Grid>
      )}
      {!isLoading && error && (
        <Grid container className={s.mainContainer}>
          <Typography>{error}</Typography>
          <Typography>Probably this org/repo <strong>{org}/{repo}</strong> doesn't exist</Typography>
        </Grid>
      )

      }
      {!isLoading && !error && (
        <Grid container className={s.mainContainer}>
          <Grid item container>
            <IssuesListHeader
              org={org}
              repo={repo}
              issuesCount={openIssuesCount}
            />
          </Grid>
          <Grid item container>
            <IssuesList issuesByNumber={issuesByNumber} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default IssuesListPage;
