import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

const ManageBtn = (props) => {
  if ((props.auth.user.level === 'tarah') || (props.auth.user.level === 'editor') || (props.auth.user.level === 'admin')) {
    return <Link to='/manage/city' className='dogm-modir dogme i-round i-sabz'>مدیریت</Link>
  } else if (props.auth.user.level === 'owner') {
    return <Link to={`/center/${props.auth.user.ownCenter}`} className='dogm-modir dogme i-round i-sabz'>فروشگاه من</Link>
  } else {
    return null
  }
}

const msp = ({ auth }) => ({ auth })

export default connect(msp)(ManageBtn);
