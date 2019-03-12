import React, { Component } from 'react';
import { RU } from '../../../actions'

const Slide = (props) => {
  const current = props.background[props.current];

  const styles = {
    imageBackground: {
      backgroundImage: `url(${ RU }/pic/orginal/${current})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center'
    }
  }
  return <div className="slide" style={styles.imageBackground}></div>
}

export default Slide;
