import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { addOption, optionUploadPic, ADD_OPTION} from '../../actions'
import _ from 'lodash'
import Loader from '../Utils/Loader'


class AddOptionModal extends Component {
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

    console.log('handle uploading-', this.state.file)
    const file = this.state.file
    this.props.optionUploadPic({ file })

  }

  handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    console.log('file az _handleImageChange EzafAksKarbar()',file);


    // create an image element with that selected file
    let img = new Image();
    img.src = window.URL.createObjectURL(file);

    let that = this;

    if (file.type !== 'image/png') {
      if (_.includes(that.state.peygham, 'لطفا یک عکس با فرمت png انتخاب کنید')) {
        that.setState({ err: true })
      } else {
        that.setState({ err: true, peygham: [ ...that.state.peygham, 'لطفا یک عکس با فرمت png انتخاب کنید' ] })
      }
    } else {
      let peygham = _.pull(that.state.peygham, 'لطفا یک عکس با فرمت png انتخاب کنید')
      that.setState({ err: false, peygham: peygham })
    }
    // img.onload = function() {
    //   let width = img.naturalWidth,
    //     height = img.naturalHeight;

    //   // unload it
    //   window.URL.revokeObjectURL(img.src);

    //   console.log('width height az _handleImageChange EzafAksKarbar()', width, height);
    //   if (( width < 640 ) || ( height < 480 )) {
    //     if (_.includes(that.state.peygham, 'سایز عکس کوچک است')) {
    //       that.setState({ err: true })
    //     } else {
    //       that.setState({ err: true, peygham: [ ...that.state.peygham, 'سایز عکس کوچک است' ] })
    //     }
    //   } else {
    //     let peygham = _.pull(that.state.peygham, 'سایز عکس کوچک است')
    //     that.setState({ err: false, peygham: peygham })
    //   }
    // };

    reader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: reader.result })
    }

    reader.readAsDataURL(file)
  }

  onSubmitForm({ name, enName, pic, picRef }) {
    this.props.addOption({ name, enName, pic, picRef })
      .then((resp) => {
        if (resp.type === ADD_OPTION) { this.props.history.push('/manage/option'); }
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
        <div className='modal'>

          <form onSubmit={this.handleSubmitPic}>
            <input type="file" onChange={this.handleImageChange} />

            <div className='chapchin width-same'>
              {this.props.wareTypes.picLoading ? ( <div className='vorod-bargozari'> <Loader /> </div> ) :
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
              <div className='form-tak'>
                <label> تصویر </label>
                <Field name="pic" component='input' label=' تصویر' disabled/>
              </div>
              <div className='form-tak'>
                <label> تصویر </label>
                <Field name="picRef" component='input' label=' تصویر' disabled/>
              </div>
              <div className='form-tak'>
                <label> نام </label>
                <Field name="name" component='input' label=' نام' />
              </div>
              <div className='form-tak'>
                <label> نام انگلیسی </label>
                <Field name="enName" component='input' label=' نام انگلیسی ' />
              </div>
            </div>

            {this.renderError()}

            <div className='chapchin width-same'>
              <button type="submit" disabled={submitting} className='dogme i-round i-abi'>ذخیره</button>

              <Link to={`/manage/wareType`} className='dogme i-round i-abi'> بازگشت </Link>
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

AddOptionModal = reduxForm({ form: 'AddOptionModal', validate })(AddOptionModal);

const mps = ({ wareTypes }) => ({ wareTypes });

export default connect(mps, { addOption, optionUploadPic })(AddOptionModal);
