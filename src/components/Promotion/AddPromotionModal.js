import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addPromotion, promotionUploadPic, ADD_PROMOTION } from '../../actions'
import _ from 'lodash'
import DotLoader from '../Utils/DotLoader'
import { RenderField, required } from '../Utils/FormField';

class AddPromotionModal extends Component {
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

    const file = this.state.file
    this.props.promotionUploadPic({ file })

  }

  handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]



    // create an image element with that selected file
    let img = new Image();
    img.src = window.URL.createObjectURL(file);

    let that = this;

    if (file.type !== 'image/jpeg') {
      if (_.includes(that.state.peygham, 'لطفا یک عکس با فرمت jpeg انتخاب کنید')) {
        that.setState({ err: true })
      } else {
        that.setState({ err: true, peygham: [ ...that.state.peygham, 'لطفا یک عکس با فرمت jpeg انتخاب کنید' ] })
      }
    } else {
      let peygham = _.pull(that.state.peygham, 'لطفا یک عکس با فرمت jpeg انتخاب کنید')
      that.setState({ err: false, peygham: peygham })
    }

    reader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: reader.result })
    }

    reader.readAsDataURL(file)
  }

  onSubmitForm(inp) {
    this.props.addPromotion(inp)
      .then((resp) => {
        if (resp.type === ADD_PROMOTION ) { this.props.history.push('/manage/promotions'); }
      });
  }
  render() {
    let {imagePreviewUrl} = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />)
    }

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='modal-darbar'>
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

          <form onSubmit={this.handleSubmitPic}>
            <input type="file" onChange={this.handleImageChange} />

            <div className='chapchin width-same'>
              {this.props.promotions.picLoading ? (<DotLoader />) :
              ( <button type="submit" className='dogme i-round i-abi' disabled={this.state.err} onClick={this.handleSubmitPic}>بارگزاری عکس</button> )}
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
              <Field name="pic" component={RenderField} label='تصویر' validate={required} disabled />
              <Field name="picRef" component={RenderField} label='تصویر' validate={required} disabled />
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

AddPromotionModal = reduxForm({ form: 'AddPromotionModal' })(AddPromotionModal);

const mps = ({ promotions }) => ({ promotions });

export default connect(mps, { addPromotion, promotionUploadPic })(AddPromotionModal);

