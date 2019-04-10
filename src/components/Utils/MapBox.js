import React, { PureComponent } from "react";

import { Map, TileLayer, Marker } from "react-leaflet";

import centeroid from "@turf/centroid";
import _ from "lodash";

import MapSearch from "./SearchUtils/MapSearch";
import MapDrawer from "./SearchUtils/MapDrawer";

class MyMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      position: [34.797735, 48.51458],
      zoom: 13
    };
    this.changeCenter = this.changeCenter.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
  }

  componentDidMount() {
    if (this.props.location) {
      this.handlePosition(this.props.location);
    }
  }

  handlePosition(location) {
    const { coordinates } = location;
    this.setState({
      position: [coordinates[1], coordinates[0]]
    });
  }
  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.props.location, prevProps.location)) {
      this.handlePosition(this.props.location);
    }
  }

  changeCenter(place) {
    const center = centeroid(place.geojson);
    this.setState({ position: [center.geometry.coordinates[1], center.geometry.coordinates[0]], zoom: 14 });
  }

  dragEnd(e) {
    this.props.onDragEnd(e.target);
  }

  render() {
    const { wrapperClass = "naghshe", mySearchBox = false, drawTools = false, setPolygon, polygon = null } = this.props;
    const { position, zoom } = this.state;

    return (
      <div className={wrapperClass + " maxbox-wrapper"}>
        {mySearchBox && <MapSearch changeCenter={this.changeCenter} />}
        <Map center={position} zoom={zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} draggable onDragEnd={this.dragEnd} />
          {drawTools && <MapDrawer setPolygon={setPolygon} polygon={polygon} />}
        </Map>
      </div>
    );
  }
}

export default MyMap;
