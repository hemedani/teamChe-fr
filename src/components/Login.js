import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form'
import { Link } from 'react-router-dom';
import { signinUser, AUTH_USER } from '../actions';
import { connect } from 'react-redux';
import DotLoader from './Utils/DotLoader';
import { RenderField, required, email, number } from './Utils/FormField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmitForm({email, password}) {
    this.props.signinUser({email, password})
      .then((resp) => { if (resp.type === AUTH_USER) { this.props.history.push('/'); } });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, auth } = this.props;
    return (
      <div className='ghab-vorod grid'>
        <h1>فرم ورود </h1>
        <div className='poshtzamine'>
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <Field name="email" component={RenderField} label=' ایمیل' tak={true} validate={[ required, email ]}/>
            <Field name="password" type='password' component={RenderField} label=' پسورد' tak={true} validate={[ required ]}/>

            {auth.error && (
              <div className="auth-error">
                نام کاربری یا رمز عبور اشتباه است
              </div>
            )}

              {auth.loginLoading ? (
                <div className='chapchin width-same'>
                  <DotLoader height='3rem' width='8rem' />
                </div>
              ) : (
                <div className='chapchin width-same'>
                  <button type="submit" disabled={submitting} className='dogme i-round i-sabz'>ورود</button>
                  <Link className='dogme i-round i-tosi' to='/register'>ثبت نام</Link>
                </div>
              )}
          </form>
        </div>
      </div>
    );
  }
}

const validate = values => {

  const errors = {}


  return errors;
}

Login = reduxForm({ form: 'Login', validate })(Login);

const msp = ({ auth }) => ({ auth })

export default connect(msp, { signinUser })(Login);
