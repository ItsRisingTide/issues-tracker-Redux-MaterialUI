import React from "react";
import { Typography, Grid } from "@material-ui/core";

const RepoSearchInfo = () => {
  return (
    <>
      <Typography variant="h5">See issues to track ideas, enhancements, tasks, or bugs for technologies you use  .</Typography>
      <Typography variant="body1">
        <Typography variant="h6">You might check out:</Typography>
        <Grid container direction="row" spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={6} md={6}>
            <Grid container direction="column">
              <code> reduxjs/redux</code>
              <code> facebook/react</code>
            </Grid>
          </Grid>
          <Grid item xs={6} md={6}>
            <Grid container direction="column">
              <code> microsoft/TypeScript</code>
              <code> mui-org/material-ui</code>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
    </>
  );
};

export default RepoSearchInfo;
