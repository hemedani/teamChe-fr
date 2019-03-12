import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateDelivery, UPDATE_DELIVERY} from '../../actions'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';

class EditDeliveryModal extends Component {
  onSubmitForm({ _id, name, enName, cost }) {
    this.props.updateDelivery({ _id, name, enName, cost })
      .then((resp) => { if (resp.type === UPDATE_DELIVERY) this.props.history.goBack(); });
  }
  
  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>
              
              <Field name="_id" component={RenderField} label='آی دی' disabled validate={required}/>
              <Field name="name" component={RenderField} label='نام' validate={required}/>
              <Field name="enName" component={RenderField} label=' نام انگلیسی ' validate={required}/>
              <Field name="cost" type='Number' component={RenderField} label='هزینه' validate={required}/>

            </div>
            <div className='chapchin width-same'>
              {this.props.loader ? ( <DotLoader />) : (
                <button type="submit" disabled={submitting} className='dogme i-round i-abi'>ذخیره</button>
              )}

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

EditDeliveryModal = reduxForm({
	form: 'EditDeliveryModal',
  validate
})(EditDeliveryModal);

const mps = ({ deliveries }, props) => {
  let delivery = _.find(deliveries.deliveries, (cnt) => cnt._id === props.match.params.id)
  return { initialValues: delivery, loader: deliveries.loaders.updateLoader }
};

export default connect(mps, { updateDelivery })(EditDeliveryModal);
