import React, { Component, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import SearchPage from "./SearchPage/search";
import Header from "./Header/header";

class View extends Component {
  
  render() {
    return (
      <Fragment>
        <Header />
        <ToastContainer preventDuplicated />
        <Switch>
          <Route path="/" component={SearchPage} />
        </Switch>
      </Fragment>
    );
  }
}

export default View;
