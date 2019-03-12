import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeCity } from "../../actions";

// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import { API_KEY_MAPBOX } from "../../actions";

// const MapCP = ReactMapboxGl({ accessToken: API_KEY_MAPBOX });

const POSITION_CIRCLE_PAINT = {
  "circle-stroke-width": 4,
  "circle-radius": 10,
  "circle-blur": 0.15,
  "circle-color": "#3770C6",
  "circle-stroke-color": "white"
};
class City extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12
    };
  }
  remove(id) {
    this.props.removeCity(id);
  }

  render() {
    return (
      <div className="grid-manage">
        <div className="grid-manage-pic">
          {/* <MapCP style="mapbox://styles/mapbox/streets-v8" center={this.props.location.coordinates} zoom={[10]} > 
              <Layer type="circle" id="position-marker" paint={POSITION_CIRCLE_PAINT}>
                <Feature coordinates={this.state.center} />
              </Layer>
            </MapCP> */}
        </div>

        <div className="grid-manage-detail">
          <div className="grid-manage-text">
            <div className="grid-m-t-n">{this.props.name}</div>
            <div className="grid-m-t-a">{this.props.enName}</div>
          </div>
          <div className="grid-manage-btn">
            <Link className="dogme i-round i-sabz round-small" to={{ pathname: `/shahrha/virashahr//${this.props._id}` }}>
              {" "}
              ویرایش{" "}
            </Link>
            <span onClick={this.remove.bind(this, this.props._id)} className="dogme i-round i-ghermez round-small">
              حذف{" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { removeCity }
)(City);
