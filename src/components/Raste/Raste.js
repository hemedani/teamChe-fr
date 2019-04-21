import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeRaste, RU } from "../../actions";

class Raste extends Component {
  remove(id) {
    console.log("id az removee shahr", id);
    this.props.removeRaste(id);
  }
  render() {
    return (
      <div className="grid-manage">
        <div className="grid-manage-detail">
          <div className="grid-manage-text">
            <div className="grid-m-t-n">{this.props.name}</div>
            <div className="grid-m-t-a">{this.props.enName}</div>
          </div>
          <div className="grid-manage-btn">
            <Link className="dogme i-round i-sabz round-small" to={{ pathname: `/manage/raste/edit/${this.props._id}` }}>
              ویرایش
            </Link>
            <span onClick={this.remove.bind(this, this.props._id)} className="dogme i-round i-ghermez round-small">
              حذف
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { removeRaste }
)(Raste);
