import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, FieldArray, change } from 'redux-form'
import ScrollLock from 'react-scrolllock';
import { addState, ADD_STATE} from '../../actions'
import _ from 'lodash'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';
import Map from '../Utils/MapBox'

class AddStateModal extends Component {
  constructor(props) {
    super(props)
    this.state = { err: true }
  }

  onSubmitForm(v) {
    let deliveryType = []
    this.props.deliveries.map(delivery => deliveryType.push({enName: delivery.enName, cost: v[delivery.enName], name: delivery.name, pic: delivery.pic}))
    this.props.addState({name: v.name, enName: v.enName, deliveryType, lat: v.lat, lng: v.lng})
      .then((resp) => {
        if (resp.type === ADD_STATE) { this.props.history.push('/manage/states'); }
      });
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

  onDragEnd(e) {
    this.props.dispatch(change('AddStateModal', 'lat', e.lngLat.lat));
    this.props.dispatch(change('AddStateModal', 'lng', e.lngLat.lng));
  }

  render() {

    const { handleSubmit, submitting } = this.props;

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
             
             <Field name="lat" component={RenderField} type='number' label='latitude'  wrapper='quadri' disabled/>
             <Field name="lng" component={RenderField} type='number' label='longitude'  wrapper='quadri' disabled/>
            </div>

            {this.renderError()}

            <div className='chapchin width-same'>
              <button type="submit" disabled={submitting} className='dogme i-round i-abi'>ذخیره</button>

              <span onClick={this.props.history.goBack} className='dogme i-round i-abi' >بازگشت </span>
            </div>

          </form>
          <br/>
          <Map onDragEnd={this.onDragEnd.bind(this)} mySearchBox={true}/>
        </div>

        <ScrollLock />
      </div>
    )
  }

}

const validate = values => {

  const errors = {}


  return errors;
}

AddStateModal = reduxForm({ form: 'AddStateModal', validate })(AddStateModal);

export default connect(null, { addState })(AddStateModal);
