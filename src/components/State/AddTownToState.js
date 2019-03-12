import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm, change } from 'redux-form'
import { addTownToState, UPDATE_STATE} from '../../actions'
import cx from 'classnames'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';
import Map from '../Utils/MapBox'

class AddTownToState extends Component {
  onSubmitForm(v) {
    const _id = this.props.match.params.id
    this.props.addTownToState({ _id, ...v })
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

  onDragEnd(e) {
    this.props.dispatch(change('AddTownToState', 'lat', e.lngLat.lat));
    this.props.dispatch(change('AddTownToState', 'lng', e.lngLat.lng));
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
              <Field name="enName" component={RenderField} label='نام انگلیسی' validate={required}/>
             
             <Field name="lat" component={RenderField} type='number' label='latitude' wrapper='quadri' disabled/>
             <Field name="lng" component={RenderField} type='number' label='longitude' wrapper='quadri' disabled/>


            </div>



            {this.renderError()}
            <div className='chapchin width-same'>
              <button type="submit" disabled={submitting} className='dogme i-round i-abi'>ذخیره</button>

              <span onClick={this.props.history.goBack} className='dogme i-round i-tosi'> بازگشت </span>
            </div>

          </form>
          <br/>
          <Map onDragEnd={this.onDragEnd.bind(this)} mySearchBox={true}/>
        </div>
      </div>
    )
  }

}

const validate = values => {

  const errors = {}


  return errors;
}

AddTownToState = reduxForm({
	form: 'AddTownToState',
  validate
})(AddTownToState);

export default connect(null, { addTownToState })(AddTownToState);
