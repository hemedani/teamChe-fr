import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Swipeable from 'react-swipeable'
import { throttle } from 'lodash'

import CarouselContainer from './CarouselContainer'
import Wrapper from './Wrapper'
import CarouselSlot from './CarouselSlot'

class Carousel extends Component {
  constructor(props){
    super(props)
    this.state = {
      position: 0,
      direction: 'next',
      sliding: false
    }
  }
  doSliding (direction, position) {
    this.setState({
      sliding: true,
      direction,
      position
    })
    setTimeout(() => {
      this.setState({
        sliding: false
      })
    }, 50)
  }
  handleSwipe(isNext) {
    return throttle(() => {
      if (isNext) {
        this.nextSlide()
      } else {
        this.prevSlide()
      }
    }, 500, { trailing: false })
  }
  getOrder(itemIndex) {
    const { position } = this.state
    const { children } = this.props
    const numItems = children.length || 1
    if (itemIndex - position < 0) {
      return numItems - Math.abs(itemIndex - position)
    }
    return itemIndex - position
  }
  nextSlide () {
    const { position } = this.state
    const { children } = this.props
    const numItems = children.length || 1
    this.doSliding('next', position === numItems - 1 ? 0 : position + 1)
  }
  prevSlide() {
    const { position } = this.state
    const { children } = this.props
    const numItems = children.length
    this.doSliding('prev', position === 0 ? numItems - 1 : position - 1)
  }
  swiping(e, deltaX, deltaY, absX, absY, velocity) {
    console.log("You're Swiping...", e, deltaX, deltaY, absX, absY, velocity)
  }

  render() {
    const { title, children } = this.props
  
    return (
      <div>
        <h2>{ title }</h2>
        <Swipeable
          onSwiping={this.swiping}
          onSwipingLeft={ this.handleSwipe.bind(this, true) }
          onSwipingRight={ this.handleSwipe.bind(this) }
        >
          <Wrapper>
            <CarouselContainer sliding={this.state.sliding} direction={this.state.direction}>
              { children.map((child, index) => (
                <CarouselSlot
                  key={ index }
                  order={ this.getOrder(index) }
                >
                  {child}
                </CarouselSlot>
              )) }
            </CarouselContainer>
          </Wrapper>
        </Swipeable>
        <button onClick={this.nextSlide.bind(this)}>Next</button>
        <button onClick={this.prevSlide.bind(this)}>prev</button>
      </div>
    )
  }
}

Carousel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default Carousel;