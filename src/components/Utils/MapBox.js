import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import axios from "axios";

import DotLoader from "../Utils/DotLoader";

import { changeCenterCoordinates, changeMapZoom } from "../../actions";

// const MapCP = ReactMapboxGl({ accessToken: API_KEY_MAPBOX });

class MyMap extends PureComponent {
  state = { places: [], loadingPlaces: false, searchValue: "", lat: 51.505, lng: -0.09, zoom: 13 };
  async getPalces(e) {
    this.setState({ searchValue: e.target.value });
    if (e.target.value.length > 1) {
      this.setState({ places: [], loadingPlaces: true });
      const places = await axios.get(
        `https://nominatim.openstreetmap.org/search.php?q=${e.target.value}&polygon_geojson=1&format=json`
      );
      this.setState({ places: places.data, loadingPlaces: false });
    } else if (e.target.value.length === 0) this.setState({ places: [] });
  }

  changeCenter(place) {
    // const center = centeroid(place.geojson);
    // this.props.changeCenterCoordinates(center.geometry.coordinates);
    // if (this.props.zoom !== [14]) this.props.changeMapZoom([14]);
    // this.props.onDragEnd({ lngLat: { lat: center.geometry.coordinates[1], lng: center.geometry.coordinates[0] } });
    // this.setState({places: []})
  }
  cleanSearch() {
    this.setState({ places: [], loadingPlaces: false, searchValue: "" });
  }

  render() {
    const {
      map: { center, zoom },
      onDragEnd,
      GeocoderProp = false,
      draggable = true,
      wrapperClass = "naghshe",
      mySearchBox = false
    } = this.props;
    const { places } = this.state;
    const position = [this.state.lat, this.state.lng];
    return (
      <div className={wrapperClass + " maxbox-wrapper"}>
        {/* {mySearchBox && (
          <div className="my-map-search-box">
            <input
              type="text"
              className="map-serach-box-input"
              onChange={this.getPalces.bind(this)}
              value={this.state.searchValue}
              placeholder="جستجو کنید ..."
            />
            {this.state.loadingPlaces && <DotLoader height={"2rem"} width={"4rem"} />}
            {((!this.state.loadingPlaces && this.state.searchValue.length > 0) || this.state.places.length > 0) && (
              <i className="pinteb-icon icon-close" onClick={this.cleanSearch.bind(this)} />
            )}
            <div className="showing-place-wrapper">
              {places.map(place => (
                <div key={place.place_id} className="showing-place" onClick={this.changeCenter.bind(this, place)}>
                  {place.display_name}
                </div>
              ))}
            </div>
          </div>
        )} */}
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            draggable
            onDragEnd={e => {
              console.log("==================");
              console.log("e", e.target.getLatLng().lat);
              console.log("==================");
            }}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

const msp = ({ map }) => ({ map });

export default connect(
  msp,
  { changeCenterCoordinates, changeMapZoom }
)(MyMap);
