import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { hideMobNav } from '../../actions/PintebAct'

class ScrollToTop extends Component {
  componentDidMount() {
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    //   this.props.history.push('/download-app')
    // }
    if (/Android|webOS|Opera Mini/i.test(navigator.userAgent)) {
      this.props.history.push('/download-app')
    }
    setTimeout(() => {
      if (this.props.auth.authTimer > 1 && this.props.location.pathname !== '/accept/code') {
        this.props.history.push('/accept/code')
      }
    }, 1000)
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
      this.props.hideMobNav()

      if (this.props.auth.authTimer > 1 && this.props.location.pathname !== '/accept/code') {
        this.props.history.push('/accept/code')
      }
    }
  }

  render() {
    return this.props.children
  }
}

const msp = ({ auth }) => ({ auth })

export default withRouter(connect(msp, { hideMobNav })(ScrollToTop))