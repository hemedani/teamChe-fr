import React, { Component } from 'react';
import { Field, reduxForm, initialize } from 'redux-form'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha'
import DotLoader from './Utils/DotLoader';
import { RenderField, required, phoneMobile, number } from './Utils/FormField';
import { signWithMob, ACCEPT_PHONE } from '../actions';

class LoginWithMob extends Component {
  constructor(props) {
    super(props);
    this.state = {captcha: ''};
  }
  componentDidMount() {
    if (this.props.auth.authenticated) { this.props.history.goBack(); }
  }

  onSubmitForm({phone}) {
    const { captcha } = this.state;
    this.props.signWithMob({phone, captcha})
      .then((resp) => {
        if (resp.type === ACCEPT_PHONE) {
          this.props.history.push('/accept/code');
        }
      });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, invalid, auth } = this.props;
    return (
      <div className='ghab-vorod grid'>
        <h1>فرم ورود </h1>
        <div className='poshtzamine'>
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <Field name="phone" component={RenderField} label=' شماره تماس ' type='number' tak={true} validate={[ required, number, phoneMobile ]}/>

            {auth.error && (
              <div className="auth-error">
                مشکلی در ورود یا ثبت نام به وجود آمده لطفا چند دقیقه بعد دوباره تلاش کنید
              </div>
            )}

              <div className="recaptcha">
                <ReCAPTCHA
                  ref="recaptcha"
                  sitekey="6Le1cWIUAAAAAIap4HlceNDfAHgcgAMQU3NyFlvi"
                  onChange={(captcha) => this.setState({captcha})}
                />
              </div>

              {auth.loginLoading ? (
                <div className='chapchin width-same'>
                  <DotLoader height='3rem' width='8rem' />
                </div>
              ) : (
                <div className='chapchin width-same'>
                  <button type="submit" disabled={invalid|| submitting || pristine || !this.state.captcha} className='dogme i-round i-sabz'>ورود</button>
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

LoginWithMob = reduxForm({ form: 'LoginWithMob', validate })(LoginWithMob);

const msp = ({ auth }) => ({ auth })

export default withRouter(connect(msp, { signWithMob })(LoginWithMob));
