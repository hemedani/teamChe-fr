import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';
import cx from 'classnames'
import ScrollLock from 'react-scrolllock';
import { removeOtherAddressFromCenter, REMOVE_CENTER_ODD_ADD_END } from '../../actions'
import DotLoader from '../Utils/DotLoader'

class RemoveOtherAddress extends Component {
  removeAdd() {
    this.props.removeOtherAddressFromCenter(this.props.match.params.id, this.props.match.params.addId)
      .then(resp => { if (resp.type === REMOVE_CENTER_ODD_ADD_END) { this.props.history.goBack() } })
  }
  render() {
    return (
      <div className='modal-darbar' >
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>
            
          <div className="sure-to-remove-other-address">از پاک کردن این آدرس مطمئن هستید ؟!</div>

          {this.props.pinteb.loaders.removeCnAdd ? ( <DotLoader /> ) : (
            <div className='chapchin width-same'>
              <span onClick={this.removeAdd.bind(this)} className='dogme i-round i-ghermez'>بله</span>
              <span onClick={this.props.history.goBack} className='dogme i-round i-tosi'> بازگشت </span>
            </div>
          )}

        </div>
        <ScrollLock />
      </div>
    )
  }

}
const msp = ({ pinteb }) => ({ pinteb });

export default connect(msp, { removeOtherAddressFromCenter })(RemoveOtherAddress);
