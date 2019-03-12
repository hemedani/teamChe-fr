import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import cx from "classnames";
import qs from "query-string";
import { getOtaghBazarganis, cleanCenters, RU } from "../../actions";
import DotLoader from "../Utils/DotLoader";

class ChangeOtaghBazarganiModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otaghBazarganis: [],
      otaghBazarganisRef: []
    };
  }
  componentWillMount() {
    let query = qs.parse(this.props.location.search);
    if (query.otaghBazarganis) {
      this.setState({ otaghBazarganis: query.otaghBazarganis });
    }
    this.props.getOtaghBazarganis();
  }
  onSubmitForm(otaghBazargani) {
    let query = qs.parse(this.props.location.search);
    query.otaghBazarganis = otaghBazargani;

    this.props.cleanCenters();
    this.props.history.push({ pathname: "/centers", search: qs.stringify(query) });
  }

  render() {
    const { otaghBazarganis, otaghBazarganiLoading } = this.props.otaghBazarganis;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <h1>نوع مرکز </h1>

          {otaghBazarganiLoading ? (
            <DotLoader />
          ) : (
            <div className="selec-box-wrapper">
              {otaghBazarganis.map(otaghBazargani => (
                <div
                  className={cx("select-box", {
                    "active-select-box": _.includes(this.state.otaghBazarganis, otaghBazargani.enName)
                  })}
                  key={otaghBazargani._id}
                  onClick={this.onSubmitForm.bind(this, otaghBazargani.enName)}
                >
                  <span className={`pinteb-icon icon-${otaghBazargani.enName}`} />
                  <div>{otaghBazargani.name}</div>
                </div>

                // <Link
                //   key={otaghBazargani._id}
                //   to={{ pathname: `centers`, search:`?otaghBazarganis=${otaghBazargani.enName}`}}
                //   className={cx('select-box', {'active-select-box': _.includes(this.state.otaghBazarganis, otaghBazargani.enName)})}
                // >
                //   <span className={`pinteb-icon icon-${otaghBazargani.enName}`} ></span>
                //   <div>{otaghBazargani.name}</div>
                // </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const msp = ({ otaghBazarganis }) => ({ otaghBazarganis });

export default connect(
  msp,
  { getOtaghBazarganis, cleanCenters }
)(ChangeOtaghBazarganiModal);
