import React, { Component } from 'react';

const DotLoader = (props) => {
  let wrapperStyle = {
    height: props.height || '8rem',
    width: props.width || '100%'
  }
  if (props.wrapper) {
    return (
      <div className='vorod-bargozari' style={wrapperStyle}>
        <div className="loading-dots">
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='dot-loader-witout-wrapper' style={wrapperStyle}>
        <div className="loading-dots">
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
        </div>
      </div>
    )
  }
}
export default DotLoader;
