import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import DotLoader from "../Utils/DotLoader";
import { getEtehadiyes } from "../../actions";

import AddEtehadiyeModal from "./AddEtehadiyeModal";
import ChangeEtehadiyePic from "./ChangeEtehadiyePicModal";
import EditEtehadiyeModal from "./EditEtehadiyeModal";

import Etehadiye from "./Etehadiye";

class Etehadiyes extends Component {
  componentWillMount() {
    this.props.getEtehadiyes();
  }
  render() {
    let { etehadiyes } = this.props;
    console.log("etehadiyes az render etehadiyes Component", etehadiyes);
    return (
      <div className="fasbaghal">
        <div className="grid">
          <h1>اتحادیه</h1>
          <div className="poshtzamine">
            <div className="chapchin width-same-big">
              <Link to={`${this.props.match.url}/add`} className="dogme i-round i-abi">
                افزودن اتحادیه
              </Link>
            </div>
            {etehadiyes.etehadiyeLoading ? (
              <DotLoader />
            ) : (
              <div className="grid-section">
                {etehadiyes.etehadiyes.map((type, i) => (
                  <Etehadiye key={i} {...type} />
                ))}
              </div>
            )}
          </div>
        </div>
        <br />
        <Route exact path="/manage/etehadiye/add" component={AddEtehadiyeModal} />
        <Route exact path="/manage/etehadiye/changepic/:id" component={ChangeEtehadiyePic} />
        <Route exact path="/manage/etehadiye/edit/:id" component={EditEtehadiyeModal} />
      </div>
    );
  }
}

const mps = ({ etehadiyes }) => ({ etehadiyes });

export default connect(
  mps,
  { getEtehadiyes }
)(Etehadiyes);
