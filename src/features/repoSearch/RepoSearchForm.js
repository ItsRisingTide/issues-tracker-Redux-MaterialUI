import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Grid, TextField, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

import { toggleTheme } from "../../pages/themeSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignContent: "right",
  },

  barContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    justifyItems: "space-around",
    alignItems: "center",
  },

  itemToBottom: {
    alignSelf: "flex-end",
  },

  switchContainer: {
    // minHeight: "100%",
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



const RepoSearchForm = ({ org, repo, setOrgAndRepo, setPage, page, pageCount }) => {

  useEffect(() => {
    setCurrentPage(page)
  }, [page])
  const [currentOrg, setCurrentOrg] = useState(org);
  const [currentRepo, setCurrentRepo] = useState(repo);
  const [currentPage, setCurrentPage] = useState(page);

  const [currentPageIsError, setCurrentPageIsError] = useState(false)

  const s = useStyles();

  const isDark = useSelector((state) => state.theme.isDark);
  const themeType = useSelector((state) => state.theme.type);

  const dispatch = useDispatch();

  const pageButtonOnClickHandler = (currentPage) => {
    if (validatePage(currentPage)) {
      setCurrentPageIsError(false)
      setPage(currentPage);
    }
    else {
      setCurrentPageIsError(true)
    }
  }

  const validatePage = (currentPage) => {
    if (currentPage > 0 && currentPage <= pageCount) {
      return true
    }
    else {
      return false
    }
  }

  return (
    <>
      <Grid container className={s.container}>
        <Grid item container className={s.barContainer}>
          <Grid item xs={4} md={4} lg={3}>
            <TextField
              id=""
              label="org"
              value={currentOrg}
              onChange={(e) => setCurrentOrg(e.target.value)}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={3}>
            <TextField
              id=""
              label="repo"
              value={currentRepo}
              onChange={(e) => setCurrentRepo(e.target.value)}
            />
          </Grid>
          <Grid item xs={3} lg={3} className={s.itemToBottom}>
            <Button
              variant="outlined"
              color={themeType === "dark" ? "secondary" : "primary"}
              onClick={() => setOrgAndRepo(currentOrg, currentRepo)}
            >
              Search repo
            </Button>
          </Grid>
        </Grid>
        {/* Page */}
        <Grid item container className={s.barContainer}>
          <Grid item xs={4} md={4} lg={3}>
            <TextField
              id=""
              label="page"
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              error={currentPageIsError}
              helperText={currentPageIsError ? `Page isn't valid (max page number is : ${pageCount})` : ""}
            />
          </Grid>
          <Grid item xs={4} sm={4} lg={3} className={s.itemToBottom}>
            <Button
              variant="outlined"
              color={themeType === "dark" ? "secondary" : "primary"}
              onClick={() => {
                pageButtonOnClickHandler(currentPage)
              }}
            >
              Jump to the page
            </Button>
          </Grid>
          <Grid item container xs={3} className={s.switchContainer}>
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
    </>
  );
};

export default RepoSearchForm;
