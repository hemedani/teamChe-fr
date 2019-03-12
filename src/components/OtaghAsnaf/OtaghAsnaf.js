import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeOtaghAsnaf, RU } from "../../actions";

class OtaghAsnaf extends Component {
  directPic() {
    if (this.props.pic) {
      const masir = `${RU}/pic/orginal/${this.props.pic}`;
      return <img src={masir} alt={this.props.name} />;
    } else {
      return <img src={`../img/back/01.jpg`} alt={this.props.name} />;
    }
  }
  remove(id) {
    console.log("id az removee shahr", id);
    this.props.removeOtaghAsnaf(id);
  }
  render() {
    return (
      <div className="grid-manage">
        <div className="grid-manage-pic">{this.directPic()}</div>
        <div className="grid-manage-detail">
          <div className="grid-manage-text">
            <div className="grid-m-t-n">{this.props.name}</div>
            <div className="grid-m-t-a">{this.props.enName}</div>
          </div>
          <div className="grid-manage-btn">
            <Link className="dogme i-round i-sabz round-small" to={{ pathname: `/manage/otaghAsnaf/edit/${this.props._id}` }}>
              {" "}
              ویرایش{" "}
            </Link>
            <Link className="dogme i-round i-abi round-small" to={`/manage/otaghAsnaf/changepic/${this.props._id}`}>
              {" "}
              تعویض تصویر{" "}
            </Link>
            <span onClick={this.remove.bind(this, this.props._id)} className="dogme i-round i-ghermez round-small">
              حذف{" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { removeOtaghAsnaf }
)(OtaghAsnaf);
