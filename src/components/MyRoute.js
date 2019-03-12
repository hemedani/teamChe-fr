import React, { Component } from 'react'

import MyNav from './Utils/MyNav'

import RouteSwitch from './RouteSwitch'

class MyRoute extends Component {

  render() {
    return (
      <div className='darbar-asli'>
        <MyNav />
        <RouteSwitch />
      </div>
    )
  }
}

export default MyRoute
