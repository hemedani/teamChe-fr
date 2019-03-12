import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, initialize } from 'redux-form'
import { Link, withRouter } from 'react-router-dom';
import { register, AUTH_USER } from '../actions';
import DotLoader from './Utils/DotLoader';
import { RenderField, required, email, number } from './Utils/FormField';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmitForm({email, password, address, name, familyName, phone}) {
    this.props.register({email, password, address, name, familyName, phone})
      .then((resp) => {
        console.log('az then register to onSubmitForm', resp);
        if (resp.type === AUTH_USER) {
          this.props.history.push('/');
        }
      });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, auth } = this.props;
    return (
      <div className='ghab-vorod grid'>
        <h1>فرم ثبت نام </h1>
        <div className='poshtzamine'>
        <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
          <Field name="email" component={RenderField} label=' ایمیل' tak={true} validate={[ required, email ]}/>
          <Field name="name" component={RenderField} label=' نام' tak={true} validate={required}/>
          <Field name="familyName" component={RenderField} label=' نام خانوادگی' tak={true} validate={required}/>
          <Field name="address" component={RenderField} label=' آدرس' tak={true} validate={required}/>
          <Field name="phone" component={RenderField} label=' تلفن' tak={true} validate={[required, number]}/>
          <Field name="password" component={RenderField} label=' رمز عبور' type='password' tak={true} validate={required}/>
          <Field name="passwordConfirm" component={RenderField} label=' تکرار رمز عبور' type='password' tak={true} validate={required}/>
          
          {auth.error && <div className="auth-error"> {auth.error} </div> }

          {auth.loginLoading ? (
                <div className='chapchin width-same'> <DotLoader height='3rem' width='8rem' /> </div>
              ) : (
                <div className='chapchin width-same'>
                  <button type="submit" className='dogme i-round i-sabz' disabled={submitting}>ثبت نام</button>
                  <Link className='dogme i-round i-tosi' to='/login'> ورود</Link>
                </div>
              )}
        </form>
      </div>
      </div>
    );
  }
}

const validate = values => {

  let errors = {}
  if (values.password !== values.passwordConfirm) {
    errors.password = 'رمز شما باید با تکرار آن یکی باشند'
  }

  return errors;
}

Register = reduxForm({ form: 'Register', validate })(Register);

const msp = ({ auth }) => ({ auth })

export default withRouter(connect(msp, { register })(Register));
