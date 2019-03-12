import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, level, ...rest }) => (
  <Route {...rest} render={props =>
    (level === 'tarah' || level === 'admin') ? ( <Component {...props}/> ) : ( <Redirect to={{ pathname: '/', state: { from: props.location } }}/> )
  }/>
)

export default AdminRoute;
