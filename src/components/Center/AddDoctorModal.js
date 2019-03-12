import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import cx from 'classnames'
import { setDoctorForCenter, getDoctorUser, GET_CENTER, RU } from '../../actions'
import DotLoader from '../Utils/DotLoader'


class AddDoctorModal extends Component {
  constructor(props) {
    super(props)
    this.state = { user: '', centerId: '' }
  }
  componentWillMount() {
    this.props.getDoctorUser();
    if (this.props.match.params.id) this.setState({centerId: this.props.match.params.id})
    if (this.props.centerId) this.setState({centerId: this.props.centerId})
  }

  setingExpertRate() {
    this.props.setDoctorForCenter(this.state.user, this.state.centerId)
      .then((resp) => { if (resp.type === GET_CENTER ) { this.props.history.goBack()} } )
  }
  render() {

    const { users } = this.props;

    return (
      <div className='modal-darbar' >
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>
            
            {users.userLoading ? <DotLoader /> : (
              <div>
                <div className='selec-box-wrapper'>
                  {users.users.map((user) => (
                      <div className={cx('select-box', {'active-select-box': this.state.user === user._id})} key={user._id} onClick={() => {
                        if (this.state.user === user._id) { this.setState({ user: ''}) } else { this.setState({ user: user._id }) }
                      }}>
                        {user.pic ? (<img src={`${ RU }/pic/orginal/${ user.pic }`} className='pinteb-icon-img'/>) : 
                          (<img src={`../../../img/m-user.png`} className='pinteb-icon-img'/>)}
                        <div> {user.name} {user.familyName}</div>
                      </div>
                  ))}
                </div>
                <div className='chapchin width-same'>
                  <button onClick={this.setingExpertRate.bind(this)} className='dogme i-round i-abi'>ذخیره</button>
      
                  <span onClick={this.props.history.goBack} className='dogme i-round i-tosi'> بازگشت </span>
                </div>
              </div>
            )}
            
        </div>
      </div>
    )
  }

}
const msp = ({ users }) => ({ users })
export default connect(msp, { setDoctorForCenter, getDoctorUser })(AddDoctorModal);
