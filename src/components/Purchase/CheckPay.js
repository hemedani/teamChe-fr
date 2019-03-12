import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import qs from 'query-string';
import { Link } from 'react-router-dom'
import { RU, sendCostForZarinPal } from '../../actions'
import DotLoader from '../Utils/DotLoader';

class CheckPay extends Component {
	constructor( props ) {
		super( props );
		this.state = {
      purchase: null,
      isPay: false,
      isLoad: true,
      err: '',
      pyg: ''
    };

	}
  componentDidMount() {
    this.checkingPay();
  }
  checkingPay() {
    const query = qs.parse(this.props.location.search);
    if (query.Authority && query.Status) {
      axios.post( `${ RU }/purchase/check/zarinpal`, query, { headers: { sabti: localStorage.getItem( 'token' ) } } )
        .then(resp => {
          if (resp.data.zarin.RefID) {
            this.setState({ isPay: true, purchase: resp.data.purchase, pyg: 'پرداخت شما با موفقیت انجام شد.', isLoad: false, err: ''})
          } else {
            this.setState({ isPay: false, purchase: resp.data.purchase, pyg: 'پرداخت شما مورد تایید نبوده است لطفا دوباره پرداخت خود را انجام دهید', isLoad: false, err: ''})
          }
        })
        .catch(err => this.setState({err: 'مشکلی در بررسی پرداخت بوجود آمده لطفا برای بررسی مجدد بر روی دگمه زیر کلیک کنید', isLoad: false }));
    } else {
      this.props.history.push('/') 
    }
  }

  sendToPay() {
    const inp = {
      Amount: this.state.purchase.sumTotalPriceWithDelivery, 
      Description: this.state.purchase.description,
      Mobile: this.props.auth.user.phone, 
      CallbackURL: 'http://test.pinteb.com/check/pay', 
      _id: this.state.purchase._id 
    }
    this.setState({ isLoad: true })
    this.props.sendCostForZarinPal(inp)
			.then( resp => {
        if (resp.zarin.Status)  {
          return window.location.href = resp.zarin.url
        } else {
          this.setState({ err: ' مشکلی در ارسال هزینه برای پرداخت به وجود آمده لطفاْ به صفحه خریدهای من بروید و با انتخاب خرید مجدداْ پرداخت را انجام دهسد'})
        }
      })

  }

  render() {
  	return (
      <div className='fasbaghal pinteb-wraper-80 check-purchase-wrapper'>
        <div className='grid'>
          <h1>پرداخت هزینه</h1>
          <div className='poshtzamine'>
            {this.state.isLoad ? (<DotLoader />) : (
              <div>
                <div className="pyg-check-purchase">{this.state.pyg}</div>
                <div className="err-check-purchase">{this.state.err}</div>
                {this.state.err && (
                  <div className='chapchin width-same'>
                    <span className="dogme i-round i-sabz" onClick={this.checkingPay.bind(this)}>تلاش مجدد برای بررسی پرداخت</span>
                    <Link  className="dogme i-round i-abi" to="/">بازگشت به خانه</Link>
                    <Link  className="dogme i-round i-abi" to="/purchase">بازگشت به خریدهای من</Link>
                  </div>
                )}
                {this.state.isPay ? (
                  <div className='chapchin width-same'>
                    <Link  className="dogme i-round i-abi" to="/">بازگشت به خانه</Link>
                    <Link  className="dogme i-round i-abi" to="/purchase">بازگشت به خریدهای من</Link>
                  </div> 
                ) : (
                  <div className='chapchin width-same'>
                    <span className="dogme i-round i-sabz" onClick={this.sendToPay.bind(this)}>تلاش مجدد برای پرداخت</span>
                    <Link  className="dogme i-round i-abi" to="/">بازگشت به خانه</Link>
                    <Link  className="dogme i-round i-abi" to="/purchase">بازگشت به خریدهای من</Link>
                  </div>
                )}
              </div>
            )}


          </div>
        </div>
      </div>
  	)
  }
}

const msp = ({ auth }) => ({ auth })

export default connect(msp, { sendCostForZarinPal })(CheckPay);
