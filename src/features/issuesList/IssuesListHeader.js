import React from "react";
import { Typography, Link } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";


const IssuesListHeader = ({ org, repo, issuesCount }) => {
  return (
    <>
      <Typography variant="h5">
        {issuesCount === 1
          ? `${issuesCount} open issue `
          : `${issuesCount} open issues `}
        for&nbsp;
        <Link target="_blank" href={`https://github.com/${org}`}>
          {" "}
          {org}{" "}
        </Link>{" "}
        /
        <Link target="_blank" href={`https://github.com/${org}/${repo}`}>
          {" "}
          {repo}{" "}
        </Link>
      </Typography>
    </>
  );
};

export default IssuesListHeader;
