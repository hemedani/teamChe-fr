import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'
import { updateWareOption, UPDATE_WARE_OPTION} from '../../actions'
import DotLoader from '../Utils/DotLoader'

class EditWareOptionModal extends Component {
  onSubmitForm({ _id, name, enName }) {
    this.props.updateWareOption({ _id, name, enName })
      .then((resp) => { if (resp.type === UPDATE_WARE_OPTION) this.props.history.goBack(); });
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

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>
              <div className='form-tak'>
                <label> آی دی </label>
                <Field name="_id" component='input' label=' آی دی ' disabled/>
              </div>
              <div className='form-tak'>
                <label> نام </label>
                <Field name="name" component='input' label=' نام' />
              </div>
              <div className='form-tak'>
                <label> نام انگلیسی </label>
                <Field name="enName" component='input' label=' نام انگلیسی ' />
              </div>

            </div>

            {this.renderError()}
            <div className='chapchin width-same'>
              <button type="submit" disabled={submitting} className='dogme i-round i-abi'>ذخیره</button>

              <span onClick={this.props.history.goBack} className='dogme i-round i-tosi'> بازگشت </span>
            </div>

          </form>
        </div>
      </div>
    )
  }

}

const validate = values => {

  const errors = {}


  return errors;
}

EditWareOptionModal = reduxForm({ form: 'EditWareOptionModal', validate })(EditWareOptionModal);

const mps = ({ wareOptions }, props) => {
  let wareOption = _.find(wareOptions.wareOptions, (cnt) => cnt._id === props.match.params.id)
  return { initialValues: wareOption }
};

export default connect(mps, { updateWareOption })(EditWareOptionModal);
