import React, { Component } from 'react';

const Loader = (props) => {
  let wrapperStyle = {
    height: props.height || '8rem'
  }
  if (props.wrapper) {
    return (
      <div className='vorod-bargozari' style={wrapperStyle}>
        <div className="ball-scale-ripple-multiple" >
          <div></div>
          <div></div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="ball-scale-ripple-multiple" >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}
export default Loader;
