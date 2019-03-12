import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change, FieldArray } from 'redux-form'
import ScrollLock from 'react-scrolllock'
import _ from 'lodash'
import cx from 'classnames'
import { RenderField, required } from '../Utils/FormField';
import DotLoader from '../Utils/DotLoader'
import { updateWare, getWareTypes, getWareOptions, getMoods, UPDATE_WARE, RU } from '../../actions'

const renderDescription = ({ fields, meta: { error } }) => (

  <div className='form-item with-btn'>
    <span onClick={() => fields.push()} className='dogme i-round i-sabz round-small top-obs-btn' >افزودن توضیحات </span>
    {fields.map((ph, index) => (
      <Field key={index} name={ph} component={RenderField} removeArray={true} label={`توضیحات ${index + 1}`} wrapper='quadri' fields={fields} index={index}/>
    ))}
  </div>
)
class EditWareModal extends Component {
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
    this.props.dispatch(change('EditWareModal', 'center', this.props.match.params.id))
  }

  onSubmitForm(inputs) {
    const { wareType, moods } = this.state;
    this.props.updateWare({ ...inputs, wareType, moods })
      .then((resp) => {
        if (resp.type === UPDATE_WARE) { this.props.history.goBack(); }
      });
  }

  componentWillReceiveProps(np) {
    if (np.initialValues.moods === this.props.initialValues.moods) {
      this.setState({ moods: np.initialValues.moods })
    }
    if (np.initialValues.wareType === this.props.initialValues.wareType) {
      this.setState({ wareType: np.initialValues.wareType })
    }
  }

  render() {

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className='modal-darbar' >
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal'>
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className='form-item'>
              <Field name="center" component={RenderField} label='ای دی مرکز' validate={required} disabled/>
              <Field name="_id" component={RenderField} label='آی دی محصول' validate={required} disabled/>
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
            </div> */}
            <hr />
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

const validate = values => {

  const errors = {}


  return errors;
}

EditWareModal = reduxForm({ form: 'EditWareModal', validate })(EditWareModal);

const mps = ({ wareTypes, wareOptions, moods, wares, pinteb }, { match }) => {
  const initialValues = _.find(wares.wares, (cnt) => cnt._id === match.params.wareId)
  return { wareTypes, wareOptions, moods, wares, pinteb, initialValues }
};

export default connect(mps, { updateWare, getWareTypes, getWareOptions, getMoods })( EditWareModal );
