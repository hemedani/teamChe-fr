import React, { Component } from 'react';
import { connect } from 'react-redux'
import qs from 'query-string'
import { getWareTypes, getVisiblePromotion, getWareSlidersVisible, getWares, showGallery, setGalleryPics, hideGallery, RU } from '../actions';
import DotLoader from './Utils/DotLoader'

// import Carousel from './Utils/LittleSlider/Carousel'
import Carousel from './Utils/Carousel/Carousel'
import ExpressCarousel from './Utils/Carousel/ExpressCarousel'

import ImageGallery from './Utils/ImageGallery'
import GalleryModal from './Utils/GalleryModal'
class Wares extends Component {

  constructor(props) {
    super(props)

   this.renderWareSliderImg = this.renderWareSliderImg.bind(this);
  }

  componentDidMount() {
    this.props.getWareTypes(); 
    this.props.getVisiblePromotion(); 
    this.props.getWareSlidersVisible();
    this.props.getWares({sailsCount: 1}, 'sailsCount');
    this.props.getWares({favoritesCount: 1}, 'favoritesCount');
  }

  showModalGallery(pics) {
    this.props.setGalleryPics(pics)
    this.props.showGallery()
  }

  renderWareSliderImg() {
    if (this.props.wareSliders.wareSliders && this.props.wareSliders.wareSliders.length > 1) {
      let images = []
      this.props.wareSliders.wareSliders.map(pi => images.push({ original: `${ RU }/pic/800/${ pi.pic }`, thumbnail:  `${ RU }/pic/240/${ pi.pic }`}))
      return (
          <ImageGallery items={images} showThumbnails={false} autoPlay showBullets onClick={this.showModalGallery.bind(this, images)} />
        )
    } else if (this.props.wareSliders.wareSliders && this.props.wareSliders.wareSliders.length === 1) {
      return (
        <img src={`${ RU }/pic/orginal/${ this.props.wareSliders.wareSliders[0].pic }`} alt={this.props.wareSliders.wareSliders[0].name} />
      )
    } else {
      return (
        <img src='../img/back/01.jpg' alt={this.props.wareSliders.wareSliders.name}/>
      )
    }
  }

  render() {
		const { wareTypes } = this.props;
    return (
      <div className='wares-wrapper'>
        <div className="wares-slide-wrapper">
          <div className="waretypes-wrapper">
            {wareTypes.wareTypes.map(wareType => (
              <div key={wareType._id} className="ware-type-slide" onClick={() => {
                  let query = { wareType: wareType.enName }
                  this.props.history.push({ pathname: '/centers', search: qs.stringify(query) })
                }}>
                <div className="img-wrapper">
                  <img src={`${ RU }/pic/orginal/${ wareType.pic }`} alt={wareType.enName}/>
                </div>
                <div className="ware-type-name">{wareType.name}</div>
              </div>
            ))}
          </div>
          <div className="waresliders-wrapper">
            {this.renderWareSliderImg()}
          </div>
        </div>
        <div className="ware-type-box">
          {wareTypes.wareTypeLoading ? ( <DotLoader /> ) : (
            <div className="ware-type-wrapper">
              {wareTypes.wareTypes.map(wareType => (
                <div key={wareType._id} className="ware-type" onClick={() => {
                    let query = { wareType: wareType.enName }
                    this.props.history.push({ pathname: '/centers', search: qs.stringify(query) })
                  }}>
                  <div className="img-wrapper">
                    <img src={`${ RU }/pic/orginal/${ wareType.pic }`} alt={wareType.enName}/>
                  </div>
                  <div className="ware-type-name">{wareType.name}</div>
                </div>
              ))}
            </div>
          )}


          {/* {wareTypes.wareTypeLoading ? ( <DotLoader /> ) : (
            <div className="ware-type-wrapper">

              <Carousel
                title="Carousel"
              >
                <Item>Item</Item>
                <Item>Item</Item>
                <Item>Item</Item>
                <Item>Item</Item>
              </Carousel>
              {wareTypes.wareTypes.map(wareType => (
                <div key={wareType._id} className="ware-type" onClick={() => {
                    let query = { wareType: wareType.enName }
                    this.props.history.push({ pathname: '/centers', search: qs.stringify(query) })
                  }}>
                  <div className="img-wrapper">
                    <img src={`${ RU }/pic/orginal/${ wareType.pic }`} alt={wareType.enName}/>
                  </div>
                  <div className="ware-type-name">{wareType.name}</div>
                </div>
              ))}
            </div>
          )} */}
        </div>
        <div className='pinteb-wraper-80'>
          <ExpressCarousel items={wareTypes.wareTypes} history={this.props.history}/>
          <Carousel lead='انواع محصولات' items={wareTypes.wareTypes} history={this.props.history}/>
        </div>

        {this.props.pinteb.showGallery && (
          <GalleryModal galleryPics={this.props.pinteb.galleryPics} hideGallery={this.props.hideGallery}/>
        )}

      </div>
    );
  }
}

const mps = ({ wareTypes, promotions, wareSliders, pinteb }) => ({ wareTypes, promotions, wareSliders, pinteb });

export default connect(mps, { getWareTypes, getVisiblePromotion, getWareSlidersVisible, getWares, showGallery, setGalleryPics,  hideGallery })( Wares );
