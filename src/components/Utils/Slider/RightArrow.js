import React, { Component } from 'react';

const RightArrow = (props) => {
  return (
    <div className="nextArrow" onClick={props.nextSlide}>
      <i className="pinteb-icon icon-angle-right" aria-hidden="true"></i>
    </div>
  );
}

export default RightArrow;
