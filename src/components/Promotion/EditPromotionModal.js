import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updatePromotion, UPDATE_PROMOTION} from '../../actions'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';

class EditPromotionModal extends Component {
  onSubmitForm(inp) {
    this.props.updatePromotion(inp)
      .then((resp) => { if (resp.type === UPDATE_PROMOTION) this.props.history.goBack(); });
  }
  
  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>

              <Field name="_id" component={RenderField} label='ای دی' validate={required} disabled />
              <Field name="link" component={RenderField} label='لینک' validate={required} />
              <Field name="visible" component={RenderField} type="checkbox" label='فعال بودن' wrapper='quintuplet checkbox'/>

            </div>

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

EditPromotionModal = reduxForm({ form: 'EditPromotionModal' })(EditPromotionModal);

const mps = ({ promotions }, props) => {
  const initialValues = _.find(promotions.promotions, (cnt) => cnt._id === props.match.params.id)
  return { initialValues }
};

export default connect(mps, { updatePromotion })(EditPromotionModal);
