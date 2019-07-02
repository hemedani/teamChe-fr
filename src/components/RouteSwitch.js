import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import ManageRoute from "./ManageRoute";

import Home from "./Home";
import LoginWithMob from "./LoginWithMob";
import AcceptCode from "./AcceptCode";
import EditOwnUser from "./EditOwnUser";
import Register from "./Register";
import Manage from "./Manage";
import NotFind from "./NotFind";

class RouteSwitch extends Component {
  render() {
    return (
      <div className="tamam-safe main-route-wrapper">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={LoginWithMob} />
          <Route exact path="/accept/code" component={AcceptCode} />

          <ManageRoute
            levels={["normal", "expert", "owner", "editor", "auther", "tarah", "admin", "storekeeper", "delivery"]}
            exact
            path="/edit/own"
            component={EditOwnUser}
          />
          <Route exact path="/register" component={Register} />
          <ManageRoute levels={["tarah", "admin", "owner", "organic.operatorAs"]} path="/manage" component={Manage} />
          <Route component={NotFind} />
        </Switch>
      </div>
    );
  }
}

export default RouteSwitch;
