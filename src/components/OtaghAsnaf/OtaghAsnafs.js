import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import DotLoader from "../Utils/DotLoader";
import { getOtaghAsnafs } from "../../actions";

import AddOtaghAsnafModal from "./AddOtaghAsnafModal";
import ChangeOtaghAsnafPic from "./ChangeOtaghAsnafPicModal";
import EditOtaghAsnafModal from "./EditOtaghAsnafModal";

import OtaghAsnaf from "./OtaghAsnaf";

class OtaghAsnafs extends Component {
  componentWillMount() {
    this.props.getOtaghAsnafs();
  }
  render() {
    let { otaghAsnafs } = this.props;
    console.log("otaghAsnafs az render otaghAsnafs Component", otaghAsnafs);
    return (
      <div className="fasbaghal">
        <div className="grid">
          <h1>اتاق های اصناف</h1>
          <div className="poshtzamine">
            <div className="chapchin width-same-big">
              <Link to={`${this.props.match.url}/add`} className="dogme i-round i-abi">
                افزودن اتاق اصناف
              </Link>
            </div>
            {otaghAsnafs.otaghAsnafLoading ? (
              <DotLoader />
            ) : (
              <div className="grid-section">
                {otaghAsnafs.otaghAsnafs.map((type, i) => (
                  <OtaghAsnaf key={i} {...type} />
                ))}
              </div>
            )}
          </div>
        </div>
        <br />
        <Route exact path="/manage/otaghAsnaf/add" component={AddOtaghAsnafModal} />
        <Route exact path="/manage/otaghAsnaf/changepic/:id" component={ChangeOtaghAsnafPic} />
        <Route exact path="/manage/otaghAsnaf/edit/:id" component={EditOtaghAsnafModal} />
      </div>
    );
  }
}

const mps = ({ otaghAsnafs }) => ({ otaghAsnafs });

export default connect(
  mps,
  { getOtaghAsnafs }
)(OtaghAsnafs);
