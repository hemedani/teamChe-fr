import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, FieldArray, change } from 'redux-form'
import ScrollLock from 'react-scrolllock';
import { setReply, SET_REPLY, SET_REPLY_ERR } from '../../actions'
import _ from 'lodash'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';

class SetReplyRate extends PureComponent {
  state = { err: true }
  async onSubmitForm(v) {
    v._id = this.props.match.params._id;
    const setReply = await this.props.setReply(v);
    if (setReply.type === SET_REPLY) this.props.history.goBack(); 
    if (setReply.type === SET_REPLY_ERR) {
      return
      // TODO : handle error is not implemented by now
    } 
  }

	renderError() {
		if (this.props.errorMassage) {
			return (
				<div className='alert alert-danger'>
					<strong>Akey!!</strong>
					{this.props.errorMassage}
				</div>
			)
		}
  }

  render() {

    const { handleSubmit, submitting } = this.props;

    return (
      <div className='modal-darbar'>
      <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>
              <Field name="text" component={RenderField} label='متن پاسخ' validate={required}/>
            </div>

            {this.renderError()}

            <div className='chapchin width-same'>
              <button type="submit" disabled={submitting} className='dogme i-round i-abi'>ذخیره</button>

              <span onClick={this.props.history.goBack} className='dogme i-round i-abi' >بازگشت </span>
            </div>

          </form>
        </div>

        <ScrollLock />
      </div>
    )
  }

}

SetReplyRate = reduxForm({ form: 'SetReplyRate' })(SetReplyRate);

export default connect(null, { setReply })(SetReplyRate);
