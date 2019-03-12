import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import cx from "classnames";
import qs from "query-string";
import { getEtehadiyes, cleanCenters, RU } from "../../actions";
import DotLoader from "../Utils/DotLoader";

class ChangeEtehadiyeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      etehadiyes: [],
      etehadiyesRef: []
    };
  }
  componentWillMount() {
    let query = qs.parse(this.props.location.search);
    if (query.etehadiyes) {
      this.setState({ etehadiyes: query.etehadiyes });
    }
    this.props.getEtehadiyes();
  }
  onSubmitForm(etehadiye) {
    let query = qs.parse(this.props.location.search);
    query.etehadiyes = etehadiye;

    this.props.cleanCenters();
    this.props.history.push({ pathname: "/centers", search: qs.stringify(query) });
  }

  render() {
    const { etehadiyes, etehadiyeLoading } = this.props.etehadiyes;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <h1>نوع مرکز </h1>

          {etehadiyeLoading ? (
            <DotLoader />
          ) : (
            <div className="selec-box-wrapper">
              {etehadiyes.map(etehadiye => (
                <div
                  className={cx("select-box", {
                    "active-select-box": _.includes(this.state.etehadiyes, etehadiye.enName)
                  })}
                  key={etehadiye._id}
                  onClick={this.onSubmitForm.bind(this, etehadiye.enName)}
                >
                  <span className={`pinteb-icon icon-${etehadiye.enName}`} />
                  <div>{etehadiye.name}</div>
                </div>

                // <Link
                //   key={etehadiye._id}
                //   to={{ pathname: `centers`, search:`?etehadiyes=${etehadiye.enName}`}}
                //   className={cx('select-box', {'active-select-box': _.includes(this.state.etehadiyes, etehadiye.enName)})}
                // >
                //   <span className={`pinteb-icon icon-${etehadiye.enName}`} ></span>
                //   <div>{etehadiye.name}</div>
                // </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const msp = ({ etehadiyes }) => ({ etehadiyes });

export default connect(
  msp,
  { getEtehadiyes, cleanCenters }
)(ChangeEtehadiyeModal);
