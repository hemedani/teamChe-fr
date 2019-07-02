import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";

const ManageBtn = props => {
  if (
    _.includes(props.auth.user.level, "tarah") ||
    _.includes(props.auth.user.level, "admin") ||
    _.includes(props.auth.user.level, "organic.operatorAs")
  ) {
    return (
      <Link to="/manage" className="dogm-modir dogme i-round i-sabz">
        مدیریت
      </Link>
    );
  } else if (props.auth.user.level === "owner") {
    return (
      <Link to={`/center/${props.auth.user.ownCenter}`} className="dogm-modir dogme i-round i-sabz">
        فروشگاه من
      </Link>
    );
  } else {
    return null;
  }
};

// props.auth.user.level === 'tarah') || (props.auth.user.level === 'editor') || (props.auth.user.level === 'admin')

const msp = ({ auth }) => ({ auth });

export default connect(msp)(ManageBtn);
