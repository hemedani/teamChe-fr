import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { 
  getWareById, getNextWare, getPreviousWare, getWareRating, changeWareRate, 
  getYourWareRate, cleanWareRates, cleanYourWareRate, cleanSelectedWare, sendVote,
  sendWareRateText, getQueryWare, clearQueryWare,
  showGallery, setGalleryPics, hideGallery,
  SELECTED_WARE, CHANGE_YOUR_WARE_RATE, setRedirect, resetRedirect,
  GET_RECOMAND_TYPE, GET_RECOMAND_CENTER, GET_RECOMAND_MOOD,
  addToCart, RU } from '../../actions'
import DotLoader from '../Utils/DotLoader'
import StarRatings from 'react-star-ratings'
import _ from 'lodash'

import ImageGallery from '../Utils/ImageGallery'
import GalleryModal from '../Utils/GalleryModal'
import Carousel from '../Utils/Carousel/Carousel'
import TabbedCarousel from '../Utils/Carousel/ُTabbedCarousel'

import ShowingRateInCenterPick from '../Rate/ShowingRateInCenterPick'
class getWareModal extends Component {
  constructor(props) {
    super(props)
    this.state = { exRate: '', yourWareRateText: '' }
  }
  componentDidMount() {
    this.props.clearQueryWare();
    this.props.cleanWareRates();
    this.props.cleanYourWareRate();
    this.props.getWareById(this.props.match.params._id)
      .then(resp => {
        if (resp.type === SELECTED_WARE) {
          this.props.getQueryWare({centerRef: resp.payload.center._id}, GET_RECOMAND_CENTER); 
          this.props.getQueryWare({wareType: resp.payload.wareType._id}, GET_RECOMAND_TYPE);
          this.props.getQueryWare({mood: resp.payload.moodsEnName[0]}, GET_RECOMAND_MOOD);
          this.renderDetailForCarousel(resp.payload)
        }
      })
    this.props.getWareRating(this.props.match.params._id);
    if (this.props.auth.authenticated) {
      this.props.getYourWareRate(this.props.match.params._id)
        .then((resp) => {
          if (resp.type && resp.payload && resp.type === CHANGE_YOUR_WARE_RATE) {
            this.setState({yourWareRateText: resp.payload.text })
          }
        })
    }
  }
  componentWillReceiveProps(np) {
    if (np.match.params._id !== this.props.match.params._id) {
      this.setState({yourWareRateText: ''})
      this.props.cleanWareRates();
      this.props.cleanYourWareRate();
      this.props.getWareById(np.match.params._id)
      .then(resp => {
        if (resp.type === SELECTED_WARE) {
          this.props.getQueryWare({centerRef: resp.payload.center._id}, GET_RECOMAND_CENTER); 
          this.props.getQueryWare({wareType: resp.payload.wareType._id}, GET_RECOMAND_TYPE);
          this.props.getQueryWare({mood: resp.payload.moodsEnName[0]}, GET_RECOMAND_MOOD);
          this.renderDetailForCarousel(resp.payload)
        }
      })
      if (this.props.auth.authenticated) {
        this.props.getYourWareRate(np.match.params._id)
          .then((resp) => {
            if (resp.type && resp.payload && resp.type === CHANGE_YOUR_WARE_RATE) {
              this.setState({yourWareRateText: resp.payload.text })
            }
          })
      }
      this.props.getWareRating(np.match.params._id);
    }
    if (np.wares.selected !== this.props.wares.selected) {
      if (this.props.pinteb.redirectUrl === `/ware/${np.wares.selected._id}`) {
        this.props.addToCart(np.wares.selected);
        this.props.resetRedirect();
      } 
    }
  }
  componentWillUnmount() {
    this.props.cleanWareRates();
    this.props.cleanYourWareRate();
    this.props.cleanSelectedWare();
  }
  goNextWare() {
    let { _id, id } = this.props.match.params;
    this.props.getNextWare({id: _id, centerId: id})
      .then(resp => {
        if (resp.type === SELECTED_WARE) {
          this.props.history.push(`/center/${this.props.match.params.id}/ware/${this.props.wares.selected._id}`)
        }
      })
  }
  goPreviousWare() {
    let { _id, id } = this.props.match.params;
    this.props.getPreviousWare({id: _id, centerId: id})
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
    this.props.changeWareRate(rate, this.props.match.params._id);
  }

  handleTxRateChange(e) { this.setState({ yourWareRateText: e.target.value }); }

  sendWRT() {
    let youRateId = this.props.rates.yourWareRate._id || null;
    this.props.sendWareRateText(youRateId, this.state.yourWareRateText, this.props.match.params._id);
  }
  backToLogin() {
    this.props.setRedirect(`/ware/${this.props.wares.selected._id}`); 
    this.props.history.push('/login');
  }
  sendToCart() {
    this.props.auth.authenticated ? this.props.addToCart(this.props.wares.selected) : ( this.backToLogin() );
  }

  showModalGallery(pics) {
    this.props.setGalleryPics(pics)
    this.props.showGallery()
  }

  renderImg() {
    if (this.props.wares.selected.pic && this.props.wares.selected.pic.length > 1) {
      let images = []
      this.props.wares.selected.pic.map(pi => images.push({ original: `${ RU }/pic/800/${ pi }`, thumbnail:  `${ RU }/pic/240/${ pi }`}))
      return (
          <ImageGallery items={images} showThumbnails={false} showBullets onClick={this.showModalGallery.bind(this, this.props.wares.selected.pic)}/>
        )
    } else if (this.props.wares.selected.pic && this.props.wares.selected.pic.length === 1) {
      return (
        <img src={`${ RU }/pic/orginal/${ this.props.wares.selected.pic[0] }`} alt={this.props.wares.selected.name} onClick={this.showModalGallery.bind(this, this.props.wares.selected.pic)}/>
      )
    } else {
      return (
        <img src='../img/back/01.jpg' alt={this.props.wares.selected.name}/>
      )
    }
  }
  renderDetailForCarousel(ware) {
    let items = [];
    items.push(
      { name: 'ملاحظات مصرف', enName: 'alert', decription: ware.alert }, 
      { name: 'خواص درمانی', enName: 'test', decription: ware.test },
      { name: 'توضیحات کلی', enName: 'writing', decription: ware.writing }
    );
    return items;
  }
  setLike() { }
  render() {

    const { wares, carts, 
      auth : { authenticated },
      rates: { wareRates, rateLoading, yourRate, textRateLoading }, } = this.props;

    return (
      <div className='pinteb-wraper-80' style={{'minHeight' : '35rem'}}>
            
            {wares.wareNpLoad ? <DotLoader /> : (

              <div style={{width: '100%'}}>

                <div className='center-pick ware-pick'>
                  <div className='center-img'>
                    {this.renderImg()}
                  </div>
                  <div className='box-center-detail'>
                    <div className="box-center-detail-head">
                      <h2>{wares.selected.title}</h2>
                      <div className="set-like" onClick={this.setLike.bind(this)}>
                        {wares.selected.hasLiked ? (
                          <div> <i className="pinteb-icon icon-heart"></i> <span>حذف از علاقه مندیها</span> </div>
                        ) : (
                          <div> <i className="pinteb-icon icon-heart-o"></i> <span>افزودن به علاقه مندیها</span> </div>
                        )}
                      </div>
                    </div>
                    <div className='ware-detail-wrap' style={{marginBottom: '2.5rem'}}> <span className="green">شناسه محصول : </span> <span className="green">{wares.selected.code}</span> </div>
                    {wares.selected.moods && wares.selected.moods.length > 0 && <div className='ware-detail-wrap half'> <span className="green">مزاج : </span> <span className="gray">{wares.selected.moods[0].name}</span> </div>}
                    {wares.selected.wareType && <div className='ware-detail-wrap half'> <span className="green">دسته بندی : </span> <span className="gray">{wares.selected.wareType.name}</span> </div>}
                    
                    <div className='box-center-detail-desc ware-details'> 
                      <div className='ware-detail-wrap half'> 
                        <span className="gray">مقدار : </span> <span className="gray strong">{wares.selected.measure}</span>
                        <div className="desc-wraper">
                          {wares.selected.description && wares.selected.description.map((desc, i) => (
                            <div key={i} className="desc"> - {desc} </div>
                          ))}
                        </div>

                      </div>
                      <div className="ware-detail-wrap half ware-sales">
                            <del className="pre-discount">{wares.selected.preDiscount}</del>
                            <div className="price"><span className="strong">{wares.selected.price}</span> تومان </div>
                            {_.some(carts.wares, { _id: wares.selected._id }) ? (
                              <span className="dogme i-round i-zard with-icon-right already-in-cart" onClick={() => console.log('thiko thiko')}>
                                <i className="pinteb-icon icon-cart-arrow-down"></i> افزوده شده به سبد خرید 
                              </span>
                            ) : (
                              <span className="dogme i-round i-sabz with-icon-right" onClick={this.sendToCart.bind(this)}>
                                <i className="pinteb-icon icon-cart-plus"></i> افزودن به سبد خرید
                              </span>
                            )}

                      </div>
                    </div>
                  </div>
                </div>

                {wares.selected.center && (
                  <div>
                    {wares.loaders.recCenterLoad ? <DotLoader /> : (
                      <Carousel lead={`محصولات دیگر ${wares.selected.center.name}`} items={wares.recomandCenter} history={this.props.history} url={'/ware'}/>
                    
                    )}
                  </div>
                )}

                {wares.selected && (
                  <TabbedCarousel items={this.renderDetailForCarousel(wares.selected)} />
                )}

                {wares.selected.center && (
                  <div>
                    {wares.loaders.recTypeLoad ? <DotLoader /> : (
                      <div>
                        <Carousel lead={`محصولات مشابه`} items={wares.recomandType} history={this.props.history} url={'/ware'}/>
                        <Carousel lead={`محصولات هم مزاج`} items={wares.recomandMood} history={this.props.history} url={'/ware'}/>

                      </div>
                    
                    )}
                  </div>
                )}

            <div className='center-rating-map'>
              <div className='center-rating'>

                <div className='header'>
                  <span className='pinteb-icon icon-comment'></span>
                  <h3 >ارسال نظر</h3>
                </div>
                { authenticated ? (

                    <div>
                      <div className='center-rating-senction'>
                        <div className='statement'>
                          <span>امتیاز شما به این محصول</span>
                          <div className="star-wrapper">
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

                        </div>
                      </div>
                      <div className='center-comment-sending' >
                        <textarea rows='5' value={this.state.yourWareRateText} onChange={this.handleTxRateChange.bind(this)}/>
                        <div className='chapchin width-same' >
                          {textRateLoading ? ( <DotLoader height='3rem' width='6rem' /> ) : (
                            <button className='dogme i-round i-abi' onClick={this.sendWRT.bind(this)}>
                              { this.state.textRate ? ('تغییر متن') : ('ارسال متن') }
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                ) : (
                  <div className='center-rating-senction'>
                    <div className='statement'>
                      <span>برای ارسال نظر لطفا وارد شوید</span>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className='map-option-pick'>
                  <div className='header'>
                    <span className='pinteb-icon icon-check'></span>
                    <h3 >امکانات محصول</h3>
                  </div>
                  {wares.selected.wareOptions && wares.selected.wareOptions.map((option) => 
                    <div className='option-pick' key={option._id}>
                      <img src={option.pic ? (`${ RU }/pic/orginal/${option.pic }`) : 'img/back/01.jpg'} alt={option.name}/>
                      <span>{option.name}</span>
                    </div>
                  )}

                    {wares.selected.wareOptions && wares.selected.wareOptions.length < 1 && (
                      <div className='empty-options'> هیچ امکاناتی ثبت نشده است</div>
                    )}
              </div> */}
            </div>

              <ShowingRateInCenterPick rates={wareRates} ware={true} sendVote={this.props.sendVote} RU={RU}/>
              <div className={cx('rate-add-loading', {'vorod-bargozari': rateLoading})}>
                {rateLoading && (<DotLoader />)}
              </div>
                
              </div>
            )}

        {this.props.pinteb.showGallery && (
          <GalleryModal galleryPics={this.props.pinteb.galleryPics} hideGallery={this.props.hideGallery}/>
        )}
      </div>
    )
  }

}

const msp = ({ wares, rates, auth, carts, pinteb }) => ({ wares, rates, auth, carts, pinteb });

export default connect(msp, { 
  getWareById, getNextWare, getPreviousWare, getWareRating, 
  showGallery, setGalleryPics, hideGallery, sendVote, setRedirect, resetRedirect,
  changeWareRate, getYourWareRate, cleanWareRates, getQueryWare, clearQueryWare,
  cleanYourWareRate, cleanSelectedWare, sendWareRateText, addToCart })(getWareModal);
