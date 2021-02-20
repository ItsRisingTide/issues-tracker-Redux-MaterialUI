import React from "react";
import {
  Typography,
  Grid,
  LinearProgress,
} from "@material-ui/core";

// const useStyles = makeStyles({});

const Loading = () => {
  // console.log("=================================================");
  // const s = useStyles();
  return (
    <>
      <Grid container direction="column">
        <Typography> Loading ...</Typography>
        <LinearProgress />
      </Grid>
    </>
  );
};

export default Loading;
