import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

// const AddBtn = (props) => (((props.auth.user.level === 'tarah') || (props.auth.user.level === 'editor')) ? (
//   <Link to={props.url} className='dogme i-round i-sabz'>{props.txt}</Link>
// ) : null)
// TODO check if any if level include with any of i allowed instead of first child of level maybe with _.some ==================
const AddBtn = ({ btColor = "sabz", levels, auth, url, txt }) =>
  _.includes(levels, auth.user.level[0]) ? (
    <Link to={url} className={`dogme i-round i-${btColor}`}>
      {txt}
    </Link>
  ) : null;

const msp = ({ auth }) => ({ auth });

export default connect(msp)(AddBtn);
