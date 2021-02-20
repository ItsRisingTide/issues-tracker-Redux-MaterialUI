import React from "react";
//
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//
import Comment from "../../components/Comment";

const IssueTimeline = () => {
  let { issueId } = useParams();

  const issue = useSelector((state) => state.issues.issuesByNumber[issueId]);

  const comments = useSelector(
    (state) => state.comments.commentsByIssue[issueId]
  );

  const isDark = useSelector((state) => state.theme.isDark);

  // console.log(`comments in Timeline ${issueId}`);
  // console.log(`comments in Timeline ${comments}`);
  // console.log(`comments in Timeline ${comments.length}`);

  const useStyles = makeStyles({
    timelineContainer: {
      position: "relative",
      // #a5a5a5
      borderBottom: !isDark ? "2px solid #eaecef" : "2px solid #555555",

      "&:before": {
        position: "absolute",
        top: "33px",
        bottom: "5px",
        left: `calc(${(100 * 1) / 12}% + 15px)`,
        display: "block",
        width: "3px",
        content: '""',
        backgroundColor: !isDark ? "#eaecef" : "#21262d",
      },
    },

    mainContainer: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      paddingTop: "20px",
      paddingBottom: "16px",
      marginBottom: "5px",
      borderBottom: !isDark ? "4px solid #eaecef" : "4px solid #21262d",
    },
  });

  const s = useStyles();

  //------------------------
  let renderedComments;
  const renderedCommentsFunc = () => {
    if (issue.comments === 0) {
      return (renderedComments = <Typography>No comments</Typography>);
    } else if (comments === null || comments === undefined) {
      return (renderedComments = (
        <Typography>Comments are loading ...</Typography>
      ));
    } else if (!comments && comments.length === 0) {
      return (renderedComments = (
        <Typography>Comments are loading ...</Typography>
      ));
    } else if (comments && comments.length !== 0) {
      return (renderedComments = (
        <Grid container >
          {/* <Typography>Comments has been loaded ...</Typography> */}
          {Object.values(comments).map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </Grid>
      ));
    } else {
      return renderedComments;
    }
  };

  //==========================
  return (
    <>
      <Grid container className={s.timelineContainer}>
        <Grid container className={s.mainContainer}>
          <Comment {...issue} />
          {renderedCommentsFunc()}
        </Grid>
      </Grid>
    </>
  );
};

export default IssueTimeline;
