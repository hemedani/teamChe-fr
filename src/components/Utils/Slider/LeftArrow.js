import React, { Component } from 'react';

const LeftArrow = (props) => {
  return (
    <div className="backArrow" onClick={props.previousSlide}>
      <i className="pinteb-icon icon-angle-left" aria-hidden="true"></i>
    </div>
  );
}

export default LeftArrow;
