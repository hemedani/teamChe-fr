import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';
import { Field, reduxForm, change } from 'redux-form'
import axios from 'axios';
import { RenderField, required } from '../Utils/FormField';
import { getForPaidPurchase, sendCostForZarinPal, RU } from '../../actions'
import DotLoader from '../Utils/DotLoader'
class PayPurchaseCost extends PureComponent {
  componentDidMount() {
    if (!this.props.forPaid.waresArr) {
      this.props.getForPaidPurchase(this.props.match.params._id)
    }
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(np) {
    if (np.forPaid !== this.props.forPaid) {
      this.props.dispatch(change('PayPurchaseCost', 'Amount', np.forPaid.sumTotalPriceWithDelivery))
      this.props.dispatch(change('PayPurchaseCost', 'Description', np.forPaid.description))
      this.props.dispatch(change('PayPurchaseCost', '_id', np.forPaid._id))
    }
  }
  onSubmitForm(zarininp) {
    this.props.sendCostForZarinPal(zarininp)
			.then( resp => {
        if (resp.zarin.Status) return window.location.href = resp.zarin.url
      })

  }
  render() {
    const { handleSubmit, pristine, reset, submitting, purchaseLoaders } = this.props;
    const { delivery } = this.props.forPaid;
    return (
			<div className='fasbaghal pinteb-wraper-80 pay-purchase-wrapper'>
				<div className='grid'>
					<h1>پرداخت هزینه</h1>
					<div className='poshtzamine'>
            <div>
              <div>
                  <Link className='dogme i-round i-abi' to='/'> بازگشت به صفحه خانه</Link>
                  <Link className='dogme i-round i-abi' to='/purchase'> بازگشت به صفحه خریدها</Link>
                  {(this.props.user.level === 'admin' || this.props.user.level === 'tarah') && <Link className='dogme i-round i-abi' to='/manage/purchases'>بازگشت به صفحه مدیریت خریدها</Link>}
              </div>
                <div className="grid-section">
                 {(!this.props.loaders.forPaidPurchaseLoad && this.props.forPaid.waresArr) ? (

                  <div className="pay-purchase-detail">

                  <div className="ware-list">
                    {this.props.forPaid.waresArr.map(ware => (
                      <div key={ware._id} className="each-ware">
                        <img src={`${ RU }/pic/orginal/${ ware.pic[0] }`} alt={ ware.title }/>
                        <div className="ware-title two-child"><span className="lead">{ware.title}</span><span className="content">{ware.measure}</span></div>
                        <div className="ware-amount form-tak">
                          <label>تعداد</label>
                          <input placeholder='تعداد محصول' type='Number' value={ware.amount} disabled/>
                        </div>
                        <div className="ware-price two-child"><span className="lead">قیمت واحد</span> <span className="content">{ware.price}</span></div>
                        <div className="total-price form-tak">
                          <label> جمع کل </label>
                          <input placeholder=' جمع کل' type='Number' value={ware.totalPrice} disabled/>
                        </div>
                          
                      </div>
                    ))}
                    <div className="sum-total-price">
                      <span className="lead">جمع کل فاکتور</span>
                      <span className="content">{this.props.forPaid.sumTotalPrice}</span>
                    </div>
                    </div>
                    <div className="address-purchase">
                    <span>ارسال برای :</span>
                    <div className="address-detail">
                    {this.props.forPaid.address.state.name} / {this.props.forPaid.address.town.name} / {this.props.forPaid.address.district} / {this.props.forPaid.address.text} / {this.props.forPaid.address.text}.
                     <br/>



                    
                    <div className='selec-box-wrapper minimal-select' >
                      <div className="lead-selec-box"><span>نوع و هزینه پست</span></div>
                          <div className='select-box minimal'>
                            {delivery.pic ? (<img src={`${ RU }/pic/orginal/${ delivery.pic }`} className='pinteb-icon-img'/>) : 
                              (<img src={`../../../img/m-delivery.png`} className='pinteb-icon-img'/>)}
                            <div> {delivery.name}، هزینه : {delivery.cost} تومان</div>
                          </div>
                    </div>




                    <br/>
                    کد پستی : {this.props.forPaid.address.code} / شماره تماس : {this.props.forPaid.address.mobilePhone} 
                    </div>
                    <div className="ware-list">
                    <div className="sum-total-price">
                      <span className="lead">جمع کل بعلاوه هزینه پست</span>
                      <span className="content">{this.props.forPaid.sumTotalPriceWithDelivery}</span>
                    </div>
                    
                    {/* <div className='selec-box-wrapper big-select-box' >
                      <div className="lead-selec-box"><span>یک درگاه انتخاب کنید</span></div>
                          <div className='select-box'>
                            <img src={`../../../img/bank/ba-300-c.png`} className='pinteb-icon-img'/>
                            <div> بانک آینده </div>
                          </div>
                          <div className='select-box'>
                            <img src={`../../../img/bank/bsi-300-c.png`} className='pinteb-icon-img'/>
                            <div> بانک صادرات </div>
                          </div>
                          <div className='select-box'>
                            <img src={`../../../img/bank/maskan-300-c.png`} className='pinteb-icon-img'/>
                            <div> بانک مسکن </div>
                          </div>
                          <div className='select-box'>
                            <img src={`../../../img/bank/me-300-c.png`} className='pinteb-icon-img'/>
                            <div> بانک خاورمیانه </div>
                          </div>
                          <div className='select-box'>
                            <img src={`../../../img/bank/mellat-300-c.png`} className='pinteb-icon-img'/>
                            <div> بانک ملت </div>
                          </div>
                          <div className='select-box'>
                            <img src={`../../../img/bank/parsian-300-c.png`} className='pinteb-icon-img'/>
                            <div> بانک پارسیان </div>
                          </div>
                          <div className='select-box'>
                            <img src={`../../../img/bank/post-300-c.png`} className='pinteb-icon-img'/>
                            <div> پست بانک </div>
                          </div>
                          <div className='select-box'>
                            <img src={`../../../img/bank/sepah-300-c.png`} className='pinteb-icon-img'/>
                            <div> بانک سپه </div>
                          </div>
                    </div> */}

                      <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
                        <div className='form-item'>
                          <Field name="_id" component={RenderField} label='آی دی' validate={required} disabled type="hidden"/>
                          <Field name="Amount" component={RenderField} label='قیمت' validate={required} disabled type="hidden"/>
                          <Field name="Mobile" component={RenderField} label='تلفن' validate={required} disabled type="hidden"/>
                          <Field name="Description" component={RenderField} label='توضیحات' disabled type="hidden"/>
                          <Field name="CallbackURL" component={RenderField} label='لینک بازگشتی' validate={required} disabled type="hidden"/>
                        </div>
                        {purchaseLoaders.sendToZarin ? ( <DotLoader /> ) : (<button type="submit" disabled={submitting} className='dogme i-round i-sabz temam-safe'>پرداخت</button>)}
                      </form>

                    </div>

                    </div>

                  </div>
                 
                  ) : ( <DotLoader /> )} 
                  </div>
              
            </div>
          </div>
				</div>
				<br/>
			</div>
    )
  }
}

PayPurchaseCost = reduxForm({ form: 'PayPurchaseCost' })(PayPurchaseCost);

const msp = ({ purchases: { forPaid, purchaseLoaders }, pinteb: { loaders }, auth : { user }}) => ({ 
  forPaid, loaders, user, purchaseLoaders, 
  initialValues: { 
    Amount: forPaid.sumTotalPriceWithDelivery, 
    Description: forPaid.description,
    Mobile: user.phone, 
    CallbackURL: 'http://test.pinteb.com/check/pay', 
    _id: forPaid._id 
  } 
})

export default withRouter(connect(msp, { getForPaidPurchase, sendCostForZarinPal })(PayPurchaseCost));