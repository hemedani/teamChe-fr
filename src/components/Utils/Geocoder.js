import { createElement, Component } from "react";
// import { Map } from "mapbox-gl";
import PropTypes from "prop-types";
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

import { API_KEY_MAPBOX } from "../../actions";

class Geocoder extends Component {
  // static contextTypes = { map: PropTypes.object.isRequired };

  // context: { map: Map; };

  // componentDidMount() {
  //   const { map } = this.context;

  //   map.addControl( new MapboxGeocoder({ accessToken: API_KEY_MAPBOX  }));
  // }

  render() {
    return null;
  }
}

export default Geocoder;
