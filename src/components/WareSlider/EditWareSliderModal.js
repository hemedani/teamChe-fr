import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { updateWareSlider, UPDATE_WARESLIDER} from '../../actions'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';

class EditWareSliderModal extends Component {
  onSubmitForm(inp) {
    this.props.updateWareSlider(inp)
      .then((resp) => { if (resp.type === UPDATE_WARESLIDER) this.props.history.goBack(); });
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

EditWareSliderModal = reduxForm({ form: 'EditWareSliderModal' })(EditWareSliderModal);

const mps = ({ wareSliders }, props) => {
  const initialValues = _.find(wareSliders.wareSliders, (cnt) => cnt._id === props.match.params.id)
  return { initialValues }
};

export default connect(mps, { updateWareSlider })(EditWareSliderModal);
