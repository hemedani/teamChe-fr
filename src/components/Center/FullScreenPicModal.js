import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ImageGallery from '../Utils/ImageGallery'
import { RU } from '../../actions'


class FullScreenPicModal extends Component {

  componentWillMount() {
    console.log('this.props from FullScreenPicModal, componentWillMount', this.props)
  }

  render() {
    let images = []
    if (this.props.location.state.pics && this.props.location.state.pics.length > 0) {
      this.props.location.state.pics.map(pic => images.push({ original: `${ RU }/pic/800/${ pic }`, thumbnail:  `${ RU }/pic/240/${ pic }`}))
    }

    return (
      <div className='modal-darbar' >
        <div className='modal-back' onClick={this.props.history.goBack}></div>
        <div className='modal full-screen-gallery'>
          <ImageGallery items={images} showThumbnails={true} autoPlay/>
        </div>
      </div>
    )
  }

}

export default FullScreenPicModal;
