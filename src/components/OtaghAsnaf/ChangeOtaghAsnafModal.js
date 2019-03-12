import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import cx from "classnames";
import qs from "query-string";
import { getOtaghAsnafs, cleanCenters, RU } from "../../actions";
import DotLoader from "../Utils/DotLoader";

class ChangeOtaghAsnafModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otaghAsnafs: [],
      otaghAsnafsRef: []
    };
  }
  componentWillMount() {
    let query = qs.parse(this.props.location.search);
    if (query.otaghAsnafs) {
      this.setState({ otaghAsnafs: query.otaghAsnafs });
    }
    this.props.getOtaghAsnafs();
  }
  onSubmitForm(otaghAsnaf) {
    let query = qs.parse(this.props.location.search);
    query.otaghAsnafs = otaghAsnaf;

    this.props.cleanCenters();
    this.props.history.push({ pathname: "/centers", search: qs.stringify(query) });
  }

  render() {
    const { otaghAsnafs, otaghAsnafLoading } = this.props.otaghAsnafs;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <h1>نوع مرکز </h1>

          {otaghAsnafLoading ? (
            <DotLoader />
          ) : (
            <div className="selec-box-wrapper">
              {otaghAsnafs.map(otaghAsnaf => (
                <div
                  className={cx("select-box", {
                    "active-select-box": _.includes(this.state.otaghAsnafs, otaghAsnaf.enName)
                  })}
                  key={otaghAsnaf._id}
                  onClick={this.onSubmitForm.bind(this, otaghAsnaf.enName)}
                >
                  <span className={`pinteb-icon icon-${otaghAsnaf.enName}`} />
                  <div>{otaghAsnaf.name}</div>
                </div>

                // <Link
                //   key={otaghAsnaf._id}
                //   to={{ pathname: `centers`, search:`?otaghAsnafs=${otaghAsnaf.enName}`}}
                //   className={cx('select-box', {'active-select-box': _.includes(this.state.otaghAsnafs, otaghAsnaf.enName)})}
                // >
                //   <span className={`pinteb-icon icon-${otaghAsnaf.enName}`} ></span>
                //   <div>{otaghAsnaf.name}</div>
                // </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const msp = ({ otaghAsnafs }) => ({ otaghAsnafs });

export default connect(
  msp,
  { getOtaghAsnafs, cleanCenters }
)(ChangeOtaghAsnafModal);
