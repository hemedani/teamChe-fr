import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import DotLoader from "../Utils/DotLoader";
import { getOtaghBazarganis } from "../../actions";

import AddOtaghBazarganiModal from "./AddOtaghBazarganiModal";
import ChangeOtaghBazarganiPic from "./ChangeOtaghBazarganiPicModal";
import EditOtaghBazarganiModal from "./EditOtaghBazarganiModal";

import OtaghBazargani from "./OtaghBazargani";

class OtaghBazarganis extends Component {
  componentWillMount() {
    this.props.getOtaghBazarganis();
  }
  render() {
    let { otaghBazarganis } = this.props;
    console.log("otaghBazarganis az render otaghBazarganis Component", otaghBazarganis);
    return (
      <div className="fasbaghal">
        <div className="grid">
          <h1>اتاق بازرگانی</h1>
          <div className="poshtzamine">
            <div className="chapchin width-same-big">
              <Link to={`${this.props.match.url}/add`} className="dogme i-round i-abi">
                افزودن اتاق بازرگانی
              </Link>
            </div>
            {otaghBazarganis.otaghBazarganiLoading ? (
              <DotLoader />
            ) : (
              <div className="grid-section">
                {otaghBazarganis.otaghBazarganis.map((type, i) => (
                  <OtaghBazargani key={i} {...type} />
                ))}
              </div>
            )}
          </div>
        </div>
        <br />
        <Route exact path="/manage/otaghBazargani/add" component={AddOtaghBazarganiModal} />
        <Route exact path="/manage/otaghBazargani/changepic/:id" component={ChangeOtaghBazarganiPic} />
        <Route exact path="/manage/otaghBazargani/edit/:id" component={EditOtaghBazarganiModal} />
      </div>
    );
  }
}

const mps = ({ otaghBazarganis }) => ({ otaghBazarganis });

export default connect(
  mps,
  { getOtaghBazarganis }
)(OtaghBazarganis);
