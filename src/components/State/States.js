import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import DotLoader from "../Utils/DotLoader";
import { getStates } from "../../actions";

import State from "./State";
import AddStateModal from "./AddStateModal";
import EditStateModal from "./EditStateModal";

class States extends Component {
  componentDidMount() {
    this.props.getStates();
  }
  render() {
    let { states } = this.props;
    return (
      <div className="fasbaghal">
        <div className="grid">
          <h1>استان ها</h1>
          <div className="poshtzamine">
            <div className="chapchin width-same-big">
              <Link to="/manage/states/add" className="dogme i-round i-abi">
                استان جدید
              </Link>
            </div>
            {states.stateLoading ? (
              <DotLoader />
            ) : (
              <div className="grid-section">
                {states.states.map(state => (
                  <State key={state._id} {...state} />
                ))}
              </div>
            )}
          </div>
        </div>
        <br />
        <Route path="/manage/states/add" exact component={AddStateModal} />
        <Route path="/manage/states/edit/:id" exact component={EditStateModal} />
      </div>
    );
  }
}

const mps = ({ states, deliveries }) => ({ states, deliveries });

export default connect(
  mps,
  { getStates }
)(States);
