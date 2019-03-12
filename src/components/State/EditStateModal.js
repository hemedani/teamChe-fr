import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { updateState, UPDATE_STATE} from '../../actions'
import cx from 'classnames'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';

class EditStateModal extends Component {
  constructor(props) {
    super(props)
    this.state = { err: true }
  }

  componentDidMount() {
    if (this.props.initialValues && this.props.initialValues.deliveryType) {
      this.props.initialValues.deliveryType.map(delivery => {
        this.props.dispatch(change('EditStateModal', delivery.enName, delivery.cost));
      })
    }
    
  }

  onSubmitForm(v) {
    let deliveryType = []
    this.props.deliveries.map(delivery => deliveryType.push({enName: delivery.enName, cost: v[delivery.enName], name: delivery.name, pic: delivery.pic}))
    this.props.updateState({_id: v._id, name: v.name, enName: v.enName, deliveryType})
      .then((resp) => { if (resp.type === UPDATE_STATE) this.props.history.goBack(); });
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
              <Field name="name" component={RenderField} label='نام' validate={required}/>
              <Field name="enName" component={RenderField} label=' نام انگلیسی ' validate={required}/>
              {this.props.deliveries.map(delivery => 
             <Field key={delivery._id} name={delivery.enName} component={RenderField} label={delivery.name} wrapper='quadri' />)}
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

EditStateModal = reduxForm({
	form: 'EditStateModal',
  validate
})(EditStateModal);

const mps = ({ states }, props) => {
  let state = _.find(states.states, (cnt) => cnt._id === props.match.params.id)
  return { initialValues: state }
};

export default connect(mps, { updateState })(EditStateModal);
