import React, { PureComponent } from "react";
import axios from "axios";

import DotLoader from "../DotLoader";
import Place from "./Place";

export default class MapSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      searchValue: "",
      loadingPlaces: false
    };
    this.getPalces = this.getPalces.bind(this);
    this.cleanSearch = this.cleanSearch.bind(this);
    this.onChangeCenter = this.onChangeCenter.bind(this);
  }
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

  cleanSearch() {
    this.setState({ places: [], loadingPlaces: false, searchValue: "" });
  }
  onChangeCenter(place) {
    this.setState({ places: [] });
    this.props.changeCenter(place);
  }
  render() {
    const {
      state: { places, searchValue, loadingPlaces },
      onChangeCenter,
      cleanSearch,
      getPalces
    } = this;
    return (
      <div className="my-map-search-box">
        <input
          type="text"
          className="map-serach-box-input"
          onChange={getPalces}
          value={searchValue}
          placeholder="جستجو کنید ..."
        />
        {loadingPlaces && <DotLoader height={"2rem"} width={"4rem"} />}
        {((!loadingPlaces && searchValue.length > 0) || places.length > 0) && (
          <i className="pinteb-icon icon-close" onClick={cleanSearch} />
        )}
        <div className="showing-place-wrapper">
          {places.map(place => (
            <Place key={place.place_id} place={place} changeCenter={onChangeCenter} />
          ))}
        </div>
      </div>
    );
  }
}
