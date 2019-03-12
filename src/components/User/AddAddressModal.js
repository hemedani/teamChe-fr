import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Field, reduxForm, change } from 'redux-form'
import ScrollLock from 'react-scrolllock';
import { addAddressToUser, UPDATE_USER_ADDRESS, hideAddAddressModal, getStates } from '../../actions'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required, email, number } from '../Utils/FormField';
import Map from '../Utils/MapBox'
import Select from 'react-select'
import { toastr } from 'react-redux-toastr'

class AddAddressModal extends Component {
	constructor( props ) {
		super( props );
		this.state = {
      state: null,
      town: null
		};
	}
  componentDidMount() {
    this.props.getStates()
  }

  onSubmitForm( Address ) {
    const { state, town } = this.state;
    if (!state || !town) {
      return toastr.error('با سلام', 'باید شهر و استان را انتخاب کنید')
    }
    Address.state = state;
    Address.town = town;
    delete Address.state.towns;
    this.props.addAddressToUser( Address )
      .then((resp) => { if (resp.type === UPDATE_USER_ADDRESS) this.props.hideAddAddressModal(); });
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
    this.props.dispatch(change('AddAddressModal', 'lat', e.lngLat.lat));
    this.props.dispatch(change('AddAddressModal', 'lng', e.lngLat.lng));
  }

  handleSelectChange(key, value) {
    // this.setState({ [key] : value })
    if (key === 'state') { this.setState({ state: value, town: null }) } else { this.setState({ town: value }) }
  }
  
  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={() => this.props.hideAddAddressModal()}></div>
        <div className='modal'>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>

              <Field name="name" component={RenderField} label=' نام' validate={required}/>
              <Field name="mobilePhone" component={RenderField} label=' شماره موبایل' validate={required}/>
              <Field name="phone" component={RenderField} label=' تلفن ثابت' validate={required}/>
              <Field name="code" component={RenderField} label=' کد پستی' validate={required}/>
              <div className='select-form-tak'>
                <label> استان</label>
                <Select
                  name="state"
                  labelKey='name'
                  valueKey='enName'
                  rtl={true}
                  placeholder='یک استان انتخاب کنید'
                  value={this.state.state}
                  optionClassName='option-select'
                  onChange={this.handleSelectChange.bind(this, 'state')}
                  options={this.props.states.states}
                />
              </div>
              {(this.state.state && this.state.state.towns && this.state.state.towns.length > 0) && (
                <div className='select-form-tak'>
                  <label> شهر</label>
                  <Select
                    name="town"
                    labelKey='name'
                    valueKey='enName'
                    rtl={true}
                    placeholder='یک شهر انتخاب کنید'
                    value={this.state.town}
                    optionClassName='option-select'
                    onChange={this.handleSelectChange.bind(this, 'town')}
                    options={this.state.state.towns}
                  />
                </div>
              )}
              <Field name="district" component={RenderField} label=' محله' validate={required}/>
              <Field name="text" component={RenderField} label=' آدرس' validate={required}/>
              <Field name="lat" component={RenderField} label=' موقعیت X' disabled={true} validate={required}/>
              <Field name="lng" component={RenderField} label=' موقعیت Y' disabled={true} validate={required}/>

            </div>



            {this.renderError()}
            {this.props.addAddressUserLoad ? ( <DotLoader /> ) : (
              <div className='chapchin width-same'>
                <button type="submit" className='dogme i-round i-abi' disabled={submitting}>ذخیره</button>

                <span onClick={() => this.props.hideAddAddressModal()} className='dogme i-round i-tosi'> بازگشت </span>
              </div> 
            )}

          </form>
          <br />
          <Map center={[54.399883, 32.159084 ]} zoom={[4]} onDragEnd={this.onDragEnd.bind(this)} />
        </div>

        <ScrollLock />
      </div>
    )
  }

}

AddAddressModal = reduxForm({ form: 'AddAddressModal' })(AddAddressModal);

const msp = ({ states }) => ({ states })

export default connect(msp, { addAddressToUser, hideAddAddressModal, getStates })(AddAddressModal);
