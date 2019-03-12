import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { sendCode, AUTH_USER } from '../actions'
import { connect } from 'react-redux'
import DotLoader from './Utils/DotLoader'
import { hhmmss } from './Utils/exRate'

class AcceptCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      err: null
    };
  }

  componentDidMount() {
    if (this.props.auth.authenticated) { this.props.history.goBack() }
    setTimeout(() => { if (this.props.auth.authTimer <= 1) { this.props.history.push('/login') } }, 1000);
  }

  onSubmitForm() {
    const id = this.props.auth.user._id
    const { code } = this.state;
    // console.log(id)
    this.props.sendCode({code, id})
      .then((resp) => {
        if (resp.type && resp.type === AUTH_USER && this.props.pinteb.redirectUrl) {
          return this.props.history.push(this.props.pinteb.redirectUrl)
        } else if (resp.type && resp.type === AUTH_USER && !this.props.auth.user.name) {
          return this.props.history.push('/edit/own') 
        } else if (resp.type && resp.type === AUTH_USER && this.props.auth.user.name) {
          return this.props.history.push('/')
        }
      })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authTimer === 1) { this.props.history.push('/login') }
  }

  render() {
    const { auth } = this.props;
    return (
      <div className='ghab-vorod grid'>
        <h1>فرم ورود </h1>
        <div className='poshtzamine'>

            <div className='form-tak taki'>
              <label>کد اس ام شده</label>
              <input type="number" value={this.state.code} onChange={(e) => {
                if (e.target.value.length > 4) {
                  this.setState({ err: 'کد اس ام اس شده چهار رقمی است', code: e.target.value })
                } else { this.setState({ code: e.target.value, err: null}) }
                
              }}/>
              {this.state.err && <span className='validate'>{this.state.err}</span>}
            </div>

            <div className="auth-timer" style={{with: '100%', textAlign: 'center'}}>
              <div>
                لطفا کد اس ام اس شده را ارسال کنید
              </div>
              <span>{hhmmss(auth.authTimer)}</span>
            </div>

            {auth.error && (
              <div className="auth-error">
                مشکلی در ورود یا ثبت نام به وجود آمده لطفا  دوباره تلاش کنید
              </div>
            )}

              {auth.loginLoading ? (
                <div className='chapchin width-same'>
                  <DotLoader height='3rem' width='8rem' />
                </div>
              ) : (
                <div className='chapchin width-same'>
                  <button  disabled={!this.state.code || this.state.code.length !== 4} className='dogme i-round i-sabz' onClick={this.onSubmitForm.bind(this)}>ارسال</button>
                </div>
              )}
        </div>
      </div>
    );
  }
}

const msp = ({ auth, pinteb }) => ({ auth, pinteb })

export default withRouter(connect(msp, { sendCode })(AcceptCode))
