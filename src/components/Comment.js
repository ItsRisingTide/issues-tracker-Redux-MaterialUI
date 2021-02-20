import React from "react";
import { useSelector } from "react-redux";
//
import { Typography, Grid, Avatar, Link, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//
import Markdown from "markdown-to-jsx";
import MarkdownElement from "../components/MarkdownElement";
import {
  pluralizedComments,
  relativeDate,
  insertMentionLinks,
  lowerCaseAllWordsExceptFirstLetters,
} from "../utils/stringUtils";
import { useOnlineAvatarStyles } from "@mui-treasury/styles/avatar/online";
// import SyntaxHighlighter from "react-syntax-highlighter";

const Comment = ({ user, created_at, comments, body, author_association }) => {
  //======================
  const isDark = useSelector((state) => state.theme.isDark);

  const styles = useOnlineAvatarStyles({
    // color: "#d500fa",
    color: isDark ? "#873c8f" : "#d500fa",
    //for light theme "#873c8f"
    // thickness: 4,
    gap: 0,
  });

  const useStyles = makeStyles((theme) => ({
    mainContainer: {
      flexDirection: "row",
      marginBottom: "20px",
    },

    leftContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyItems: "flex-start",
      paddingTop: "5px",

      [theme.breakpoints.down('md')]: {
        flexDirection: "row",
        alignItems: "flex-start",
        // paddingLeft: "calc(${(100 * 1) / 12}% + 24px",
      },
    },

    avatarContainer: {
      [theme.breakpoints.down('md')]: {
        marginLeft: `calc(${(100 * 1) / 12}% - 5px)`,
      },
    },

    rightContainer: {
      position: "relative",
      marginTop: "10px",
      flexDirection: "column",
      border: isDark ? "1px solid #30363d" : "1px solid #e6e7e9",
      borderRadius: "6px",
    },

    paperLayer: {
      width: "100%",
    },

    row1Container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: "16px",
      paddingLeft: "16px",
      borderBottom: isDark ? "1px solid #30363d" : "1px solid #e6e7e9",
      alignItems: "center",
      background: isDark ? "#161b22" : "#f7f8fa",
      borderTopRightRadius: "6px",
      borderTopLeftRadius: "6px",
      minHeight: "35px",
    },

    tagDescription: {
      paddingTop: "2px",
      paddingBottom: "2px",
      // color: isDark ? theme.palette.common.white : theme.palette.text.primary,
    },

    tagDescriptionUserLink: {
      "&:hover": {
        color: theme.palette.secondary,
      },
    },

    rightContainerOuter: {
      position: "relative",

      "&:before": {
        position: "absolute",
        display: "block",
        content: '""',
        width: "0px",
        height: "0px",

        // right: "100%",
        top: "18px",
        left: "-19px",

        borderColor: "transparent",
        borderStyle: "solid solid outset",
        borderWidth: "10px",
        // borderRightColor: "#fff",
        borderRightColor: isDark ? "#30363d" : "#e6e7e9",
      },
    },

    row2Container: {
      width: "100%",
      flexWrap: "wrap",
      padding: "15px",

      //to get triangle tip/arrow os the comment
      "&:before": {
        position: "absolute",
        display: "block",
        content: '""',
        width: "0px",
        height: "0px",

        // right: "100%",
        top: "7px",
        left: "-18.5px",
        // left: `calc(${(100 * 1) / 12}% - 18px)`,

        borderColor: "transparent",
        borderStyle: "solid solid outset",
        borderWidth: "10px",
        borderRightColor: isDark ? "#161b22" : "#f7f8fa",
        // backgroundColor: !isDark ? "#eaecef" : "#21262d",
      },
    },

    markdown: {
      // width: "500px",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      // "&:nth-child(n)": {
      //   width: markdownContainerWidthRef.current,
      // },
    },
  }));

  // const styles42 = (theme) => ({
  //   listItem: {
  //     marginTop: theme.spacing(1),
  //   },
  // });

  const s = useStyles();

  return (
    <>
      <Grid container className={s.mainContainer} xs={12}>
        <Grid item container xs={12} md={1} className={s.leftContainer}>
          <Grid item className={s.avatarContainer}>
            <div className={styles.root}>
              <Avatar
                src={user.avatar_url}
                alt={user.login}
                color={"secondary"}
                className={s.avatar}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={11} container className={s.rightContainerOuter}>
          <Grid item container xs={12} className={s.rightContainer}>
            <Paper className={s.paperLayer}>
              <Grid item container className={s.row1Container}>
                <Typography className={s.tagDescription}>
                  <Link
                    className={s.tagDescriptionUserLink}
                    href={`https://github.com/${user.login}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {user.login}
                  </Link>{" "}
                  commented this issue
                  <span> {relativeDate(created_at)} </span> ·{" "}
                  {pluralizedComments(comments)}
                </Typography>
                <Typography>
                  {lowerCaseAllWordsExceptFirstLetters(author_association)}
                </Typography>
              </Grid>

              <Grid item container className={s.row2Container}>
                <MarkdownElement >
                  {/* <SyntaxHighlighter language="javascript"> */}
                  <Markdown children={insertMentionLinks(body)} />
                  {/* </SyntaxHighlighter> */}
                </MarkdownElement>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Comment;
