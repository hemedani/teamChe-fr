import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import DotLoader from "../Utils/DotLoader";
import { getParishes, cleanParish } from "../../actions";

import Parish from "./Parish";
import AddParishModal from "./AddParishModal";
import EditParishModal from "./EditParishModal";

class Parishes extends Component {
  constructor(props) {
    super(props);
    this.continueGetParish = this.continueGetParish.bind(this);
  }
  componentDidMount() {
    this.props.cleanParish();
    this.props.getParishes();
  }
  continueGetParish() {
    let query = {};
    if (this.props.parishes.parishes.length > 0) {
      query._id = this.props.parishes.parishes[this.props.parishes.parishes.length - 1]._id;
    }
    this.props.getParishes(query);
  }
  componentWillUnmount() {
    this.props.cleanParish();
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
            <div className="grid-section">
              {parishes.parishes.map((parish, i) => (
                <Parish key={i} {...parish} />
              ))}
            </div>

            {parishes.parishLoading && <DotLoader />}
            {!parishes.parishLoading && !parishes.richEnd && (
              <div className="chapchin width-same-big">
                <span className="dogme i-round i-abi" onClick={this.continueGetParish}>
                  ادامه محله ها
                </span>
              </div>
            )}
          </div>
        </div>
        <Route path="/manage/parish/add" exact component={AddParishModal} />
        <Route path="/manage/parish/edit/:id" exact component={EditParishModal} />
      </div>
    );
  }
}

const mps = ({ parishes }) => ({ parishes });

export default connect(
  mps,
  { getParishes, cleanParish }
)(Parishes);
