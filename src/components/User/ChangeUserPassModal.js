import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { changeUserPass, UPDATE_USER} from '../../actions'
import cx from 'classnames'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';

class ChangeUserPassModal extends Component {
  onSubmitForm({ _id, password }) {
    this.props.changeUserPass({ _id, password })
      .then((resp) => { if (resp.type === UPDATE_USER) this.props.history.goBack(); });
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
              <Field name="_id" component={RenderField} label=' آی دی ' disabled/>
              <Field name="password" type='password' component={RenderField} label=' پسورد' validate={[ required ]}/>

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

ChangeUserPassModal = reduxForm({
	form: 'ChangeUserPassModal',
  validate
})(ChangeUserPassModal);

const mps = ({ users }, props) => {
  let user = _.find(users.users, (usr) => usr._id === props.match.params.id)
  return { initialValues: user }
};

export default connect(mps, { changeUserPass })(ChangeUserPassModal);
