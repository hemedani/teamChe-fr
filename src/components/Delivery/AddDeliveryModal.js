import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ScrollLock from 'react-scrolllock';
import { Field, reduxForm } from 'redux-form'
import { addDelivery, deliveryUploadPic, ADD_DELIVERY, DELIVERY_ADD_PIC} from '../../actions'
import _ from 'lodash'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';

class AddDeliveryModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
      err: true,
      peygham: []
    }
    this.handleSubmitPic = this.handleSubmitPic.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  handleSubmitPic(e) {
    e.preventDefault()

    const { file } = this.state;
    this.props.deliveryUploadPic({ file })
      // .then(resp => {
      //   if (resp.type === DELIVERY_ADD_PIC) {
      //     this.props.dispatch(change('AddDeliveryModal', 'picRef', resp.payload._id));
      //     this.props.dispatch(change('AddDeliveryModal', 'pic', resp.payload.name));
      //   }
      // })

  }

  handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    let img = new Image();
    img.src = window.URL.createObjectURL(file);

    // let that = this;

    if (file.type !== 'image/png') {
      if (_.includes(this.state.peygham, 'لطفا یک عکس با فرمت png انتخاب کنید')) {
        this.setState({ err: true })
      } else {
        this.setState({ err: true, peygham: [ ...this.state.peygham, 'لطفا یک عکس با فرمت png انتخاب کنید' ] })
      }
    } else {
      let peygham = _.pull(this.state.peygham, 'لطفا یک عکس با فرمت png انتخاب کنید')
      this.setState({ err: false, peygham: peygham })
    }

    reader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: reader.result })
    }

    reader.readAsDataURL(file)
  }

  onSubmitForm({ name, enName, cost, pic, picRef }) {
    this.props.addDelivery({ name, enName, cost, pic, picRef })
      .then((resp) => {
        if (resp.type === ADD_DELIVERY) { this.props.history.push('/manage/delivery'); }
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
  render() {
    let {imagePreviewUrl} = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt='عکس برای بارگذاری'/>)
    }

    const { handleSubmit, submitting } = this.props;

    return (
      <div className='modal-darbar'>
      <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

          <form onSubmit={this.handleSubmitPic}>
            <input type="file" onChange={this.handleImageChange} />

            <div className='chapchin width-same'>
              {this.props.deliveries.picLoading ? (  <DotLoader /> ) : (
                <button type="submit" className='dogme i-round i-abi' disabled={this.state.err}>بارگزاری عکس</button>
              )}
            </div>


            {this.state.peygham.map((pey, i) => (<div className='ekhtar' key={i}>{pey}</div>))}
          </form>

          <div className='ghab-aks-darbar'>
            <div className='ghab-aks'>
              {$imagePreview}
            </div>
          </div>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>
              <Field name="pic" component={RenderField} label='تصویر' disabled validate={required}/>
              <Field name="picRef" component={RenderField} label='تصویر' disabled validate={required}/>
              <Field name="name" component={RenderField} label='نام' validate={required}/>
              <Field name="enName" component={RenderField} label=' نام انگلیسی ' validate={required}/>
              <Field name="cost" type='Number' component={RenderField} label='هزینه' validate={required}/>
            </div>

            <div className='chapchin width-same'>
              <button type="submit" disabled={submitting} className='dogme i-round i-abi'>ذخیره</button>

              <span onClick={this.props.history.goBack} className='dogme i-round i-abi' >بازگشت </span>
            </div>

          </form>
        </div>
        <ScrollLock />
      </div>
    )
  }

}

AddDeliveryModal = reduxForm({ form: 'AddDeliveryModal' })(AddDeliveryModal);

const mps = ({ deliveries }) => ({ deliveries });


export default connect(mps, { addDelivery, deliveryUploadPic })(AddDeliveryModal);
