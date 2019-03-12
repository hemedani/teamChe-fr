import React, { Component } from 'react';
import styled from 'styled-components'
import Carousel from './Carousel'

const Item = styled.div`
  background: darkorange;
  text-align: center;
  padding: 50px;
  color: white;
`
export default class CarouselPage extends Component {
  render() {
    return (
      <div>
        <Carousel
          title="Carousel"
        >
          <Item>Item</Item>
          <Item>Item</Item>
          <Item>Item</Item>
          <Item>Item</Item>
        </Carousel>
      </div>
    );
  }
}