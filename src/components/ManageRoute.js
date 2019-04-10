import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";

const ManageRoute = ({ component: Component, auth, levels, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      _.includes(levels, auth.user.level[0]) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const msp = ({ auth }) => ({ auth });

export default connect(msp)(ManageRoute);
