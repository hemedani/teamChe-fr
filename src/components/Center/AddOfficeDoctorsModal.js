import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import cx from 'classnames'
import _ from 'lodash'
import { setOfficeDoctorsForCenter, getDoctorUser, GET_CENTER, RU } from '../../actions'
import DotLoader from '../Utils/DotLoader'


class AddOfficeDoctors extends Component {
  constructor(props) {
    super(props)
    this.state = { officeDoctors: [], centerId: '' }
  }
  componentWillMount() {
    this.props.getDoctorUser();
    if (this.props.match.params.id) this.setState({centerId: this.props.match.params.id})
    if (this.props.centerId) this.setState({centerId: this.props.centerId})
  }

  setingExpertRate() {
    let { officeDoctors, centerId } = this.state;
    this.props.setOfficeDoctorsForCenter(officeDoctors, centerId)
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
                      <div className={cx('select-box', {'active-select-box': _.some(this.state.officeDoctors, user)})} key={user._id} onClick={() => {
                        let { officeDoctors } = this.state;
                        officeDoctors = _.xorBy(officeDoctors, [user], '_id')
                        console.log(officeDoctors)
                        this.setState({ officeDoctors })
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
export default connect(msp, { setOfficeDoctorsForCenter, getDoctorUser })(AddOfficeDoctors);
