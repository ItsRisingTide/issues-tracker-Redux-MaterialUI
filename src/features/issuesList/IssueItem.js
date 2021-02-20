import React from "react";
import {
  Typography,
  makeStyles,
  Grid,
  Avatar,
  Button,
} from "@material-ui/core";
import { shorten } from "../../utils/stringUtils";

import { useHistory } from "react-router-dom";

import { useOnlineAvatarStyles } from "@mui-treasury/styles/avatar/online";
// import { purple } from "@material-ui/core/colors";

// import { useRowGutterStyles } from "@mui-treasury/styles/gutter/row";

import { useSelector } from "react-redux";

const IssueItem = ({ user, number, title, comments, body, labels }) => {
  const useStyles = makeStyles((theme) => ({
    card: {
      flexDirection: "row",
      paddingTop: "12px",
      borderBottom: "2px solid #a5a5a5",
    },

    leftSection: {
      flexDirection: "column",
      alignItems: "center",
      justifyItems: "flex-start",
      paddingTop: "5px",
    },

    rightSection: {
      flexDirection: "row",
      paddingBottom: "12px",
      overflowWrap: "break-word",
      wordWrap: "break-word",
    },

    titleContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      "&:hover": {
        cursor: "pointer",

        "& $titleText": {
          color: isDark
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
          // color: theme.palette.secondary.main,
        },

        "& $idText": {
          // color: theme.palette.common.black,
          opacity: "1",
        },
      },
    },

    titleText: {
      lineHeight: "1.4",
      "&:hover": {
        cursor: "pointer",
        // color: theme.palette.secondary,
      },
    },

    idText: {
      fontWeight: "400",
      opacity: "0.85",
    },

    labelsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },

    buttonLabel: {
      minWidth: "0px",
      marginRight: "5px",
      borderRadius: "20px",
      fontSize: "12px",
      paddingTop: "1px",
      paddingBottom: "1px",
      paddingRight: "6px",
      paddingLeft: "6px",
    },

    avatar: {},
  }));

  let history = useHistory();

  const isDark = useSelector((state) => state.theme.isDark);

  // console.log(`IssueItem isDark value : ${isDark}`);

  const s = useStyles();
  const styles = useOnlineAvatarStyles({
    color: "#d500fa",
    //for light theme "#873c8f"
    // thickness: 4,
    gap: 0,
  });
  return (
    <>
      <Grid container className={s.card}>
        <Grid item xs={12} md={2} container className={s.leftSection}>
          <div className={styles.root}>
            <Avatar
              src={user.avatar_url}
              alt={user.login}
              color={"primary"}
              className={s.avatar}
            />
          </div>
          <Typography> {user.login} </Typography>
        </Grid>
        <Grid item xs={10}>
          <Grid item container className={s.rightSection}>
            <Grid item container className={s.titleContainer}>
              <Typography
                variant="h6"
                color="default"
                className={s.titleText}
                onClick={() => {
                  console.log(`Headder of ${number} is clicked`);
                  history.push(`/issues/${number}`);
                }}
              >
                <span className={s.idText}>#{number} </span> {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {comments === 1
                  ? `(${comments} comment)`
                  : `(${comments} comments)`}
              </Typography>
            </Grid>
            <Grid item className={s.bodyTextContainer} zeroMinWidth>
              <Typography noWrap={false}>
                {" "}
                {shorten(body).toString()}{" "}
              </Typography>
            </Grid>
            {!(labels.length === 0) && (
              <Grid item className={s.labelsContainer}>
                {labels.map((label) => (
                  <Button
                    key={label.id}
                    variant="outlined"
                    color="primary"
                    size="small"
                    disableRipple={true}
                    disableFocusRipple={true}
                    style={{ backgroundColor: "transparent" }}
                    className={s.buttonLabel}
                  >
                    {label.name}
                  </Button>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default IssueItem;
