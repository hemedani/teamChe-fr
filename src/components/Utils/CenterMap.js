import React from 'react';
import { Link } from 'react-router-dom'
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";

import { API_KEY_MAPBOX } from '../../actions'

const MapCP = ReactMapboxGl({ accessToken: API_KEY_MAPBOX });

const image = new Image(30, 50);
image.src = 'img/marker.svg';

const images = ['newIcon', image];

const CenterMap = ({ center, zoom, centers, setPopup, nullPopup, setCoords, popup, checkCaracter }) => (
    <div className='map-center'>
      <MapCP style="mapbox://styles/mapbox/streets-v8" center={center} zoom={zoom} > 
        <Layer type="symbol" layout={{ 'icon-image': 'newIcon' }} images={images} >
          {centers.map(cn => (
            <Feature key={cn._id} coordinates={cn.location.coordinates} onClick={() => { setCoords(cn.location.coordinates); setPopup(cn); }}/>
          ))}
        </Layer>

          {popup && (
            <Popup
              key={popup._id}
              coordinates={popup.location.coordinates}
              offset={{ 'bottom-left': [12, -38],  'bottom': [0, -20], 'bottom-right': [-12, -38] }}>
              <i className='pinteb-icon icon-close popup-icon-map' onClick={() => nullPopup() } ></i>
              <Link to={`/center/${popup._id}`} >{popup.name}</Link>
              <div>{checkCaracter(popup.address)}</div>
            </Popup>
          )}
      </MapCP>
    </div>
)

export default CenterMap;