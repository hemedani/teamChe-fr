import React from 'react'
import ScrollLock from 'react-scrolllock'
import ImageGallery from './ImageGallery'

const GalleryModal = ({ hideGallery, galleryPics }) => (
  <div className='modal-darbar' >
    <div className='modal-back' onClick={hideGallery}></div>
    <div className='modal full-screen-gallery'>
      <ImageGallery items={galleryPics} showThumbnails={true} autoPlay/>
    </div>
    <ScrollLock />
  </div>
)

export default GalleryModal;
