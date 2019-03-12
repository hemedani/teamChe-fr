import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import cx from "classnames";
import qs from "query-string";
import { getRastes, cleanCenters, RU } from "../../actions";
import DotLoader from "../Utils/DotLoader";

class ChangeRasteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rastes: [],
      rastesRef: []
    };
  }
  componentWillMount() {
    let query = qs.parse(this.props.location.search);
    if (query.rastes) {
      this.setState({ rastes: query.rastes });
    }
    this.props.getRastes();
  }
  onSubmitForm(raste) {
    let query = qs.parse(this.props.location.search);
    query.rastes = raste;

    this.props.cleanCenters();
    this.props.history.push({ pathname: "/centers", search: qs.stringify(query) });
  }

  render() {
    const { rastes, rasteLoading } = this.props.rastes;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <h1>نوع مرکز </h1>

          {rasteLoading ? (
            <DotLoader />
          ) : (
            <div className="selec-box-wrapper">
              {rastes.map(raste => (
                <div
                  className={cx("select-box", {
                    "active-select-box": _.includes(this.state.rastes, raste.enName)
                  })}
                  key={raste._id}
                  onClick={this.onSubmitForm.bind(this, raste.enName)}
                >
                  <span className={`pinteb-icon icon-${raste.enName}`} />
                  <div>{raste.name}</div>
                </div>

                // <Link
                //   key={raste._id}
                //   to={{ pathname: `centers`, search:`?rastes=${raste.enName}`}}
                //   className={cx('select-box', {'active-select-box': _.includes(this.state.rastes, raste.enName)})}
                // >
                //   <span className={`pinteb-icon icon-${raste.enName}`} ></span>
                //   <div>{raste.name}</div>
                // </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const msp = ({ rastes }) => ({ rastes });

export default connect(
  msp,
  { getRastes, cleanCenters }
)(ChangeRasteModal);
