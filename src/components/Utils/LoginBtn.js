import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { singoutUser } from '../../actions'

const LoginBtn = (props) => {
  let khoroj = () => (props.singoutUser());
  return ((props.auth.authenticated) ? (
    <span className='login-btns'>
      <NavLink className='nav-btn-top margin-left-zero' to='/edit/own'> {props.auth.user.name} </NavLink>
      <a className='nav-btn-top' onClick={khoroj}>/ خروج</a>
    </span> 
) : <NavLink className='nav-btn-top' to='/login'>ورود</NavLink> )
}

const msp = ({ auth }) => ({ auth })

export default connect(msp, { singoutUser })(LoginBtn);
