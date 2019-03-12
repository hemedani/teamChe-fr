import React, { Component } from 'react';


class ProgressBar extends Component {
	constructor( props ) {
		super( props );
		this.state = {
      hoverParent: false
    }
  }
  toggleHover() {
    this.setState({
      hoverParent: !this.state.hoverParent
    })
  }
  render() {
    let { img, percent = 0, size = 0.08, pcolor = '#307bbb', scolor = '#cccccc', bgColor = 'whitesmoke', scale = '5rem' } = this.props;
    let styl = {
      parent: {
        backgroundColor: scolor,
        fontSize: scale
      },
      back: {
        position: 'absolute',
        top: `${size}em`,
        left: `${size}em`,
        display: 'block',
        zIndex: 1,
        borderRadius: '50%',
        backgroundColor: bgColor,
        width: `${1 - 2 * size}em`,
        height: `${1 - 2 * size}em`,
        transitionProperty: 'all',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in',
      },
      bar: {
        transform: `rotate(${360/100*percent}deg)`,
        border: `${size}em solid ${pcolor}`,
        width: `${1 - 2 * size}em`,
        height: `${1 - 2 * size}em`,
      },
      barAfter: {
        transform: `rotate(180deg)`
      },
      slice: {
        clip: percent > 50 ? `rect(auto, auto, auto, auto)` : `rect(0em, 1em, 1em, 0.5em)`
      },
      span: {
        color: this.state.hoverParent ? pcolor : '#cccccc'
      },
      fill: {}
    }
    if (percent > 50) {
      styl.fill = {
        position: `absolute`,
        border: `0.08em solid ${pcolor}`,
        width: `0.84em`,
        height: `0.84em`,
        clip: `rect(0em, 0.5em, 1em, 0em)`,
        borderRadius: `50%`,
        transform: `rotate(180deg)`
      }
    }
    return (
      <div className="c100 orange" style={styl.parent} onMouseOver={this.toggleHover.bind(this)} onMouseOut={this.toggleHover.bind(this)}>
          {img ? (
            <img src={img} style={styl.back}/>
          ) : <label style={styl.back}></label>}
          <span style={styl.span}> % {percent}</span>
          <div className="slice" style={styl.slice}>
              <div className="bar" style={styl.bar}></div>
              {percent > 50 && <div className="bar" style={styl.barAfter}></div>}
              <div className="fill" style={styl.fill}></div>
          </div>
      </div>
    )

  }
}
export default ProgressBar;

