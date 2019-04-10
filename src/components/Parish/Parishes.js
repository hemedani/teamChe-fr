import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import DotLoader from "../Utils/DotLoader";
import { getParishes } from "../../actions";

import Parish from "./Parish";
import AddParishModal from "./AddParishModal";

class Parishes extends Component {
  componentWillMount() {
    this.props.getParishes();
  }
  render() {
    let { parishes } = this.props;
    return (
      <div className="fasbaghal">
        <div className="grid">
          <h1>محله ها</h1>
          <div className="poshtzamine">
            <div className="chapchin width-same-big">
              <Link to={`${this.props.match.url}/add`} className="dogme i-round i-abi">
                افزودن محله
              </Link>
            </div>
            {parishes.parishLoading ? (
              <DotLoader />
            ) : (
              <div className="grid-section">
                {parishes.parishes.map((parish, i) => (
                  <Parish key={i} {...parish} />
                ))}
              </div>
            )}
          </div>
        </div>
        <br />
        <Route path="/manage/parish/add" exact component={AddParishModal} />
      </div>
    );
  }
}

const mps = ({ parishes }) => ({ parishes });

export default connect(
  mps,
  { getParishes }
)(Parishes);
