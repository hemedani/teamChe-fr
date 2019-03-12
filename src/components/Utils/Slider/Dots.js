import React, { Component } from 'react';
import Dot from './Dot';

/*
  Dots is the parent of Dot. It's purpose is to handle the fancy logic, and produce
  child Dot components. These Dot components are pushed into an array, which is
  then rendered to the screen. It will produce the same number of dots that
  there are images in the user defined images array in Slider 
*/
const Dots = ({ numberOfDots, isCurrent, dotClick}) => {

  let dotsCount = [];
  // Creates an array of Dot components, and assigns one of them the isCurrent CSS class, which makes it a different color
  for(let i = 0; i < numberOfDots; i++) {
    let name = (isCurrent === i) ? "isCurrent dot" : "dot";
    dotsCount.push(<Dot key={i} name={name} dotClick={dotClick} dotIndex={i} />)
  }

  return (
    <div className="dotsContainer">
      {dotsCount}
    </div>
  )
}

export default Dots
