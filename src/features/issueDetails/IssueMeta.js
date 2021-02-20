import React from "react";
import { useSelector, useDispatch } from "react-redux";
//
import { toggleTheme } from "../../pages/themeSlice";
//
import { Typography, Grid, Button, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
//
import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
//
import { pluralizedComments, relativeDate } from "../../utils/stringUtils";
//
import { useHistory } from "react-router-dom";

const IssueMeta = ({
  title,
  number,
  labels,
  user,
  comments,
  created_at,
  state,
}) => {
  //======================
  const isDark = useSelector((state) => state.theme.isDark);
  const themeType = useSelector((state) => state.theme.type);

  const dispatch = useDispatch();
  //======================
  const useStyles = makeStyles((theme) => ({
    mainContainer: {
      display: "flex",
      flexDirection: "column",
      borderBottom: "2px solid #a5a5a5",
    },

    row1Container: {
      display: "flex",
      flexDirection: "row",
    },

    titleContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },

    titleText: {
      color: isDark ? theme.palette.common.white : theme.palette.text.primary,
    },

    row2Container: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "10px",
    },

    buttonOpenLabel: {
      color: green[600],
      borderRadius: "2em",
    },

    buttonLabel: {
      borderRadius: "2em",
      marginRight: "4px",
    },

    tagDescriptionContainer: {
      paddingLeft: "15px",
    },

    tagDescription: {
      paddingTop: "2px",
      paddingBottom: "2px",
      color: isDark ? theme.palette.common.white : theme.palette.text.primary,
    },

    rightContainer: {
      paddingLeft: "10px",
    },

    switchContainer: {
      // minHeight: "100%",
      paddingLeft: "6px",
      alignSelf: "flex-end",
      flexDirection: "row",
      flexWrap: "nowrap",
      alignItems: "center",
      justifyItems: "flex-end",
    },

    moonIcon: {
      height: "40px",
      width: "auto",
    },
  }));

  const s = useStyles();

  let history = useHistory();

  return (
    <>
      <Grid container className={s.mainContainer}>
        <Grid item container className={s.row1Container} xs="auto" md={12}>
          <Grid item container className={s.titleContainer} xs={12} md={9}>
            <Typography
              variant="h4"
              gutterBottom="true"
              className={s.titleText}
            >
              {title} <span className={s.idText}> #{number} </span>
              {state === "open" && (
                <Button
                  variant="outlined"
                  size="small"
                  disableRipple={true}
                  disableFocusRipple={true}
                  style={{ backgroundColor: "transparent" }}
                  className={s.buttonOpenLabel}
                >
                  Open
                </Button>
              )}
            </Typography>
          </Grid>
          <Grid item container xs={10} md={3} className={s.rightContainer}>
            <Grid item xs={12}>
              <Button
                onClick={() => {
                  history.push(`/`);
                }}
              >
                Back to the IssuesList
              </Button>
            </Grid>
            <Grid item container xs={12} className={s.switchContainer}>
              <WbSunnyIcon
                color={themeType === "light" ? "secondary" : "inherit"}
              />
              <Grid item>
                <Switch
                  value=""
                  checked={isDark}
                  onChange={() => dispatch(toggleTheme())}
                  inputProps={{ "aria-label": "" }}
                />
              </Grid>
              <Brightness3Icon
                color={themeType === "dark" ? "secondary" : "inherit"}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container className={s.row2Container} xs={12}>
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
          <Grid item className={s.tagDescriptionContainer}>
            <Typography className={s.tagDescription}>
              <span>{user.login} </span>
              opened this issue
              <span> {relativeDate(created_at)} </span> ·{" "}
              {pluralizedComments(comments)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default IssueMeta;
