import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import DotLoader from "../Utils/DotLoader";
import { getRastes } from "../../actions";

import AddRasteModal from "./AddRasteModal";
import ChangeRastePic from "./ChangeRastePicModal";
import EditRasteModal from "./EditRasteModal";

import Raste from "./Raste";

class Rastes extends Component {
  componentWillMount() {
    this.props.getRastes();
  }
  render() {
    let { rastes } = this.props;
    console.log("rastes az render rastes Component", rastes);
    return (
      <div className="fasbaghal">
        <div className="grid">
          <h1>رسته ها</h1>
          <div className="poshtzamine">
            <div className="chapchin width-same-big">
              <Link to={`${this.props.match.url}/add`} className="dogme i-round i-abi">
                افزودن رسته
              </Link>
            </div>
            {rastes.rasteLoading ? (
              <DotLoader />
            ) : (
              <div className="grid-section">
                {rastes.rastes.map((type, i) => (
                  <Raste key={i} {...type} />
                ))}
              </div>
            )}
          </div>
        </div>
        <br />
        <Route exact path="/manage/raste/add" component={AddRasteModal} />
        <Route exact path="/manage/raste/changepic/:id" component={ChangeRastePic} />
        <Route exact path="/manage/raste/edit/:id" component={EditRasteModal} />
      </div>
    );
  }
}

const mps = ({ rastes }) => ({ rastes });

export default connect(
  mps,
  { getRastes }
)(Rastes);
