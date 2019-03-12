import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  getWareById, getNextWare, getPreviousWare, getWareRating, changeWareRate, 
  getYourWareRate, cleanWareRates, cleanYourWareRate, cleanSelectedWare,
  sendWareRateText, RU, SELECTED_WARE, CHANGE_YOUR_WARE_RATE,
  addToCart } from '../../actions'
import DotLoader from '../Utils/DotLoader'
import StarRatings from 'react-star-ratings'
import _ from 'lodash'

class getWareModal extends Component {
  constructor(props) {
    super(props)
    this.state = { exRate: '', yourWareRateText: '' }
  }
  componentDidMount() {
    this.props.cleanWareRates();
    this.props.cleanYourWareRate();
    this.props.getWareById(this.props.match.params.wareId);
    this.props.getWareRating(this.props.match.params.wareId);
    if (this.props.auth.authenticated) {
      this.props.getYourWareRate(this.props.match.params.wareId)
        .then((resp) => {
          if (resp.type && resp.payload && resp.type === CHANGE_YOUR_WARE_RATE) {
            this.setState({yourWareRateText: resp.payload.text })
          }
        })
    }
  }
  componentWillReceiveProps(np) {
    if (np.match.params.wareId !== this.props.match.params.wareId) {
      this.setState({yourWareRateText: ''})
      this.props.cleanWareRates();
      this.props.cleanYourWareRate();
      if (this.props.auth.authenticated) {
        this.props.getYourWareRate(np.match.params.wareId)
          .then((resp) => {
            if (resp.type && resp.payload && resp.type === CHANGE_YOUR_WARE_RATE) {
              this.setState({yourWareRateText: resp.payload.text })
            }
          })
      }
      this.props.getWareRating(np.match.params.wareId);
    }
  }
  componentWillUnmount() {
    this.props.cleanWareRates();
    this.props.cleanYourWareRate();
    this.props.cleanSelectedWare();
  }
  goNextWare() {
    let { wareId, id } = this.props.match.params;
    this.props.getNextWare({id: wareId, centerId: id})
      .then(resp => {
        if (resp.type === SELECTED_WARE) {
          this.props.history.push(`/center/${this.props.match.params.id}/ware/${this.props.wares.selected._id}`)
        }
      })
  }
  goPreviousWare() {
    let { wareId, id } = this.props.match.params;
    this.props.getPreviousWare({id: wareId, centerId: id})
      .then(resp => {
        if (resp.type === SELECTED_WARE) {
          this.props.history.push(`/center/${this.props.match.params.id}/ware/${this.props.wares.selected._id}`)
        }
      })
  }
  goBack() {
    this.props.history.push(`/center/${this.props.match.params.id}`)
  }
  handeRateChange(rate) {
    this.props.changeWareRate(rate, this.props.match.params.wareId);
  }

  handleTxRateChange(e) { this.setState({ yourWareRateText: e.target.value }); }

  sendWRT() {
    let youRateId = this.props.rates.yourWareRate._id || null;
    this.props.sendWareRateText(youRateId, this.state.yourWareRateText, this.props.match.params.wareId);
  }
  sendToCart() {
    this.props.addToCart(this.props.wares.selected)
      .then((resp) => {
        console.log('resp az sendToCart', resp, this.props.carts)
      })
  }

  render() {

    const { wares, carts } = this.props;

    return (
      <div className='modal-darbar modal-ware-wrapper' >
        <div className='modal-back' onClick={this.goBack.bind(this)}></div>
        <div className='modal modal-ware'>
          {!wares.richLast && (
            <span className='next-ware pinteb-icon icon-angle-right' onClick={this.goNextWare.bind(this)}></span>
          )}
          {!wares.richFirst && (
            <span className='previous-ware pinteb-icon icon-angle-left' onClick={this.goPreviousWare.bind(this)}></span>
          )}
            
            {wares.wareNpLoad ? <DotLoader /> : (
              <div>
                <div className="ware-modal-detail">
                  <div className="ware-common ware-cart">
                    {_.some(carts.wares, { _id: wares.selected._id }) ? (
                      <span className="dogme i-round i-sabz with-icon-right" onClick={() => console.log('thiko thiko')}>
                        <i className="pinteb-icon icon-cart-plus"></i> در سبد خرید
                      </span>
                    ) : (
                      <span className="dogme i-round i-sabz with-icon-right" onClick={this.sendToCart.bind(this)}>
                        <i className="pinteb-icon icon-cart-plus"></i> اضافه به سبد خرید
                      </span>
                    )}
                    <div>
                      <i className="pinteb-icon icon-share-alt"></i>
                      <div className='ware-total-rate'>{wares.selected.wareRate ? (wares.selected.wareRate.average || 0) : 0}</div>
                    </div>
                  </div>
                  {this.props.auth.authenticated && (
                    <div className="ware-common ware-your-rate">
                      <p>امتیاز شما به این محصول</p>
                      {this.props.rates.setWareRateLoading ? ( <DotLoader width='4rem' height='1rem'/>   ) : (
                        <StarRatings
                          rating={this.props.rates.yourWareRate.wareRate || 0}
                          starWidthAndHeight={'25px'}
                          starSpacing={'4px'}
                          isAggregateRating={false}
                          numOfStars={ 5 }
                          changeRating={this.handeRateChange.bind(this)}
                          isSelectable={true}
                        />
                      )}
                     
                    </div>
                  )}
                  <div className="ware-common ware-rates-text">

                  {this.props.rates.wareRates.map((wareRate) => (
                  
                    <div className="ware-rate-text" key={wareRate._id}>
                      <div className="ware-rate-pic">
                        {wareRate.user.pic ? (<img src={`${ RU }/pic/orginal/${ wareRate.user.pic }`} alt=""/>) : (
                          <img src={`../../../img/default/default-user.svg`} alt=""/>
                        )}
                      </div>
                      <div className="ware-rate-detail">
                        <span className="ware-rate-name">{wareRate.user.name} {wareRate.user.familyName}</span>
                        <span className="ware-rate-tx">{wareRate.text}</span>
                      </div>
                    </div>

                  ))}
                    
                  </div>
                  { this.props.auth.authenticated ? (
                    <div className="ware-common ware-your-text">
                      <textarea row='2' value={this.state.yourWareRateText} onChange={this.handleTxRateChange.bind(this)} placeholder='نظر شما درباره این محصول'/>
                      <span className="dogme i-round i-sabz" onClick={this.sendWRT.bind(this)}>ارسال</span>
                    </div>
                  ) : (
                    <div className="ware-common ware-your-text">
                      <p>لطفا برای ارسال نظر وارد شوید</p>
                    </div>
                  ) }
                </div>
                <div className='ware-modal-img-div'>
                  {wares.selected.pic && (<img src={`${ RU }/pic/orginal/${ wares.selected.pic }`} className='ware-modal-img' alt={wares.selected.title}/>)}
                </div>
                
              </div>
            )}
            
        </div>
      </div>
    )
  }

}

const msp = ({ wares, rates, auth, carts }) => ({ wares, rates, auth, carts });

export default connect(msp, { 
  getWareById, getNextWare, getPreviousWare, getWareRating, changeWareRate, getYourWareRate, cleanWareRates, 
  cleanYourWareRate, cleanSelectedWare, sendWareRateText, addToCart })(getWareModal);
