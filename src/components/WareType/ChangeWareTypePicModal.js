import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { wareTypeChangePic, WARE_TYPE_UPDATE} from '../../actions'
import _ from 'lodash'
import Loader from '../Utils/Loader'


class ChangeWareTypePicModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
      err: true,
      peygham: [],
      id: ''
    }
    this.handleSubmitPic = this.handleSubmitPic.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ id: this.props.match.params.id})
    }
  }

  handleSubmitPic(e) {
    e.preventDefault()

    console.log('handle uploading-', this.state.file)
    const file = this.state.file
    const id = this.props.match.params.id;
    this.props.wareTypeChangePic({ file, id })
      .then((resp) => { if (resp.type === WARE_TYPE_UPDATE) this.props.history.goBack(); })

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

    reader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: reader.result })
    }

    reader.readAsDataURL(file)
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

            <div className='form-item'>
              <div className='form-tak taki'>
                <label> ای دی </label>
                <input value={this.state.id} disabled/>
              </div>
            </div>
        </div>
      </div>
    )
  }

}

const mps = ({ wareTypes }) => ({ wareTypes });

export default connect(mps, { wareTypeChangePic })(ChangeWareTypePicModal);
