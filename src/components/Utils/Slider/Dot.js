import React, { Component } from 'react';

/*
  Dot is the child of Dots, and acts as a presentational component, as well as doubles as an event emitter.
  It displays the dot on the screen, and also can tell the main component(Slider), to change the
  currently displayed image, which is initiated if a user clicks on the dot.
*/
const Dot = ({ name, dotClick, dotIndex }) => {
  return <span className={name} onClick={() => dotClick(dotIndex)}></span>
}

export default Dot;
