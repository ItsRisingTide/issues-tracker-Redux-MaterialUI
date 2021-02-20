import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import IssueItem from "./IssueItem";

const useStyles = makeStyles({
  listContainer: {
    flexDirection: "column",
  },
});

const IssuesList = ({ issuesByNumber }) => {
  const s = useStyles();
  return (
    <>
      <Grid container className={s.listContainer}>
        {Object.values(issuesByNumber).map((issue) => (
          <IssueItem key={issue.id} {...issue} />
        ))}
      </Grid>
    </>
  );
};

export default IssuesList;
