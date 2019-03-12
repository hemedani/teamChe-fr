/*global google*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm, change, FieldArray } from 'redux-form'
import { setOtherAddressForCenter, GET_CENTER, API_KEY2, RU } from '../../actions'

import { RenderField, required } from '../Utils/FormField';
import Map from '../Utils/MapBox'

const renderPhones = ({ fields, meta: { error } }) => (

  <div className='form-item with-btn'>
    <span onClick={() => fields.push()} className='dogme i-round i-sabz round-small top-obs-btn' >افزودن شماره </span>
    {fields.map((phone, index) => (
      <Field key={index} name={phone} component={RenderField} type='number' label={`شماره ${index + 1}`} wrapper='quadri' removeArray={true} fields={fields} index={index}/>
    ))}
  </div>
)
class AddAddressModal extends Component {
  constructor(props) {
    super(props)
    this.state = { center: { lat: 32.159084, lng: 54.399883 } }
  }
  componentWillMount() {
    this.props.dispatch(change('AddAddressModal', '_id', this.props.match.params.id));
  }

  onDragEnd(e) {
    this.props.dispatch(change('AddAddressModal', 'lat', e.lngLat.lat));
    this.props.dispatch(change('AddAddressModal', 'lng', e.lngLat.lng));
  }

  onSubmitForm(address) {
    this.props.setOtherAddressForCenter(address)
      .then((resp) => {
        if (resp.type === GET_CENTER) {
          this.props.history.push('/manage/center');
        }
      });
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='modal-darbar' >
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>

              <Field name="_id" component={RenderField} label='ای دی' disabled/>
              <Field name="name" component={RenderField} label='نام' validate={required}/>
              <Field name="address" component={RenderField} label='آدرس' validate={required}/>
              <Field name="lat" component={RenderField} label='id' type='number' label='Latitude' validate={required} wrapper='quadri'/>
              <Field name="lng" component={RenderField} label='id' type='number' label='Longitude' validate={required} wrapper='quadri'/>
              
            </div>
            <hr/>
            
            <FieldArray name='phones' component={renderPhones}/>

            <hr />
            <div className='chapchin width-same'>
              <button type="submit" disabled={submitting} className='dogme i-round i-abi'>ذخیره</button>

              <Link to={`/manage/center`} className='dogme i-round i-tosi'> بازگشت </Link>
            </div>

          </form>
          <br/>
            <Map center={[54.399883, 32.159084 ]} zoom={[4]} onDragEnd={this.onDragEnd.bind(this)} GeocoderProp={true}/>
        </div>
      </div>
    )
  }

}
AddAddressModal = reduxForm({ form: 'AddAddressModal' })(AddAddressModal);
const msp = ({ users }) => ({ users })
export default connect(msp, { setOtherAddressForCenter })(AddAddressModal);
