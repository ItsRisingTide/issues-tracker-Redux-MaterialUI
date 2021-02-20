import IssuesSearch from "./pages/IssuesSearch";
import IssueInfo from "./pages/IssueInfo";

import React from "react";
import { Route, Switch } from "react-router-dom";

import "../src/App.css";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={(props) => <IssuesSearch {...props} />} />
        <Route
          exact
          path="/issues/:issueId"
          render={(props) => <IssueInfo {...props} />}
        />
      </Switch>
    </>
  );
};

export default App;
