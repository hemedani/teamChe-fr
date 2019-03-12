import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change, FieldArray } from 'redux-form'
import Dropzone from 'react-dropzone'
import ScrollLock from 'react-scrolllock'
import _ from 'lodash'
import cx from 'classnames'
import { RenderField, required } from '../Utils/FormField';
import DotLoader from '../Utils/DotLoader'
import ProgressBar from '../Utils/ProgressBar'
import { addWare, wareUploadPic, getWareTypes, getWareOptions, getMoods, globalPicUp, cleanGlobalPicUpPercent, ADD_WARE, RU} from '../../actions'

const renderDescription = ({ fields, meta: { error } }) => (

  <div className='form-item with-btn'>
    <span onClick={() => fields.push()} className='dogme i-round i-sabz round-small top-obs-btn' >افزودن توضیحات </span>
    {fields.map((ph, index) => (
      <Field key={index} name={ph} component={RenderField} removeArray={true} label={`توضیحات ${index + 1}`} wrapper='quadri' fields={fields} index={index}/>
    ))}
  </div>
)
class AddWareModal extends Component {
  constructor(props) {
    super(props)
    this.state = {

      wareType: null,

      // wareOptions: [],
      moods: [],

      err: true,
      peygham: [],
      files: []
    }
  }
  componentDidMount() {
		this.props.getWareTypes();
		this.props.getWareOptions();
		this.props.getMoods();
    this.props.dispatch(change('AddWareModal', 'center', this.props.match.params.id))
  }

  onDrop(files) { 
    this.setState({ files })
    this.props.globalPicUp({ files })
  }

  onSubmitForm(inputs) {
    const { wareType, moods } = this.state;
    const { picsUploaded } = this.props.pinteb;
    this.props.addWare({ ...inputs, picsUploaded, wareType, moods })
      .then((resp) => {
        if (resp.type === ADD_WARE) { this.props.history.goBack(); }
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

  componentWillUnmount() {
    this.props.cleanGlobalPicUpPercent();
  }

  render() {
    let {imagePreviewUrl} = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />)
    }

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='modal-darbar' >
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>

          
          <section>
            {!this.props.pinteb.loaders.picUpLoading && (
              <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)} className='dropzone-styl'>
                  <p>عکس هاتون رو به اینجا بکشید، یا کلیک کنید و اونها رو انتخاب کنید</p>
                </Dropzone>
              </div>
            )}
            <aside>
              <h2>عکسها</h2>

              <div className="prog-bar" style={{display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around'}}>
                {this.state.files.map((f, i) => {
                  let percentObj = _.find(this.props.pinteb.picUpPercent, { i: i }) || {}
                  let percent = 0;
                  if (percentObj.percent) { percent = percentObj.percent }
                  if (percent === 100) { return null } else {
                    return (
                      <ProgressBar key={i} percent={percent} img={f.preview} pcolor='#e86704' scale='10rem'/>
                    )
                  }
                })}
              </div>
              <hr/>
              <div className="uploaded-pic-wrapper">
                {this.props.pinteb.picsUploaded.map(upPic => (
                  <div key={upPic.name}>
                    <div className="image">
                      <img src={`${ RU }/pic/orginal/${ upPic.name }`} alt="upPic.name"/>
                    </div>
                    <span className="pinteb-icon icon-check"></span>
                  </div>
                ))}
              </div>
              
            </aside>
          </section>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>
              <Field name="center" component={RenderField} label='ای دی مرکز' validate={required} disabled/>
              <Field name="title" component={RenderField} label='عنوان محصول' validate={required} />
              <Field name="code" component={RenderField} label='کد محصول' validate={required} />
              <Field name="measure" component={RenderField} label='مقدار' validate={required} />
              <Field name="price" component={RenderField} type='Number' label='قیمت' validate={required} />
              <Field name="preDiscount" component={RenderField} type='Number' label='قیمت قبل از تخفیف' validate={required} />
              <Field name="packWeight" component={RenderField} type='Number' label='وزن با بسته بندی' validate={required} />
              <Field name="count" component={RenderField} type='Number' label='موجودی انبار' validate={required} />
              <Field name="maxSales" component={RenderField} type='Number' label='تعداد نهایی سفارش' validate={required} />
              <Field name="special" component={RenderField} type="checkbox" label='ویژه' wrapper='quintuplet checkbox' />
              <Field name="unavailable" component={RenderField} type="checkbox" label='ناموجود' wrapper='quintuplet checkbox' />

            </div>


            <br/>
            <hr/>
            
            <FieldArray name='description' component={renderDescription}/>

            <hr />

            <div className='form-item'>

              <div className='form-tak taki'>
                <label> ملاحظات مصرف </label>
                <Field name="alert" component='textarea' label=' ملاحظات مصرف ' rows='3'/>
              </div>

              <div className='form-tak taki'>
                <label> خواص درمانی </label>
                <Field name="test" component='textarea' label=' خواص درمانی ' rows='3'/>
              </div>

              <div className='form-tak taki'>
                <label> توضیحات کلی </label>
                <Field name="writing" component='textarea' label=' توضیحات کلی ' rows='3'/>
              </div>
              
            </div>


            <hr />

            {/* <div className='selec-box-wrapper minimal-select' >
              <div className="lead-selec-box"><span>امکانات محصول</span></div>
              {this.props.wareOptions.wareOptions.map((wareOption) => (
                <div  className={cx('select-box minimal', {'active-select-box': _.some(this.state.wareOptions, wareOption)})} key={wareOption._id} onClick={() => {
                  let { wareOptions } = this.state;
                  wareOptions = _.xorBy(wareOptions, [wareOption], '_id')
                  this.setState({ wareOptions })
                }}>
                  {wareOption.pic ? (<img src={`${ RU }/pic/orginal/${ wareOption.pic }`} className='pinteb-icon-img'/>) : (<span className='pinteb-icon icon-atari' ></span>)}
                  <div>{wareOption.name}</div>
                </div>
              ))}
            </div>

            <hr /> */}

            <div className='selec-box-wrapper minimal-select' >
              <div className="lead-selec-box"><span>انواع محصول</span></div>
              {this.props.wareTypes.wareTypes.map((wt) => (
                  <div className={cx('select-box minimal', {'active-select-box': (this.state.wareType && this.state.wareType._id === wt._id)})} key={wt._id} onClick={() => {
                    let { wareType } = this.state;
                    wareType ? (wareType._id === wt._id ? wareType = null : wareType = wt) : wareType = wt;
                    this.setState({ wareType })
                  }}>
                    {wt.pic ? (<img src={`${ RU }/pic/orginal/${ wt.pic }`} className='pinteb-icon-img'/>) : (<span className='pinteb-icon icon-atari' ></span>)}
                    <div>{wt.name}</div>
                  </div>
              ))}
            </div>

            <hr />

            <div className='selec-box-wrapper minimal-select' >
              <div className="lead-selec-box"><span>مزاج</span></div>
              {this.props.moods.moods.map((mood) => (
                  <div className={cx('select-box minimal', {'active-select-box': _.some(this.state.moods, mood)})} key={mood._id} onClick={() => {
                    let { moods } = this.state;
                    moods = _.xorBy(moods, [mood], '_id')
                    this.setState({ moods })
                  }}>
                    {mood.pic ? (<img src={`${ RU }/pic/orginal/${ mood.pic }`} className='pinteb-icon-img'/>) : (<span className='pinteb-icon icon-atari' ></span>)}
                    <div>{mood.name}</div>
                  </div>
              ))}
            </div>

            <hr />

            {this.renderError()}
            {this.props.wares.wareAddLoad ? ( <DotLoader /> ) : (
              <div className='chapchin width-same'>
                <button type="submit" disabled={submitting} className='dogme i-round i-sabz'>ذخیره</button>
                <span onClick={this.props.history.goBack} className='dogme i-round i-tosi'> بازگشت </span>
              </div>
            )}

          </form>

        <ScrollLock />
        </div>
      </div>
    )
  }

}

AddWareModal = reduxForm({ form: 'AddWareModal' })(AddWareModal);

const mps = ({ wareTypes, wareOptions, moods, wares, pinteb }) => ({ wareTypes, wareOptions, moods, wares, pinteb });

export default connect(mps, { addWare, wareUploadPic, getWareTypes, getWareOptions, getMoods, globalPicUp, cleanGlobalPicUpPercent })( AddWareModal );
