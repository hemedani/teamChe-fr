/*global google*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import { addCity, ADD_CITY } from "../../actions";
import Map from "../Utils/MapBox";

class addCityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 32.159084, lng: 54.399883 },
      zoom: 5,
      polygon: []
    };
  }
  onSubmitForm({ name, enName, lat, lng, latD, lngD }) {
    const { polygon } = this.state;
    this.props.addCity({ name, enName, lat, lng, latD, lngD, polygon }).then(resp => {
      if (resp.type === ADD_CITY) {
        this.props.history.goBack();
      }
    });
  }

  renderError() {
    if (this.props.errorMassage) {
      return (
        <div className="alert alert-danger">
          <strong>Akey!!</strong>
          {this.props.errorMassage}
        </div>
      );
    }
  }

  getPolygon(polygon) {
    let coordinates = [];
    let path = polygon.getPath();
    for (var i = 0; i < path.length; i++) {
      coordinates.push([path.getAt(i).lng(), path.getAt(i).lat()]);
    }
    console.log(coordinates);
    this.setState({ polygon: coordinates });
  }

  onDragEnd(e) {
    this.props.dispatch(change("addCityModal", "lat", e.lngLat.lat));
    this.props.dispatch(change("addCityModal", "lng", e.lngLat.lng));
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          {/*
              <form onSubmit={this._handleSubmit}>
                <input type="input" defaultValue={this.props.karbar.email} />

                <button type="submit" onClick={this._handleSubmit}>اضافه کردن ایستگاه</button>

                <Link to={`/istgah`} className='btn'> هیچی </Link>
              </form>
            */}

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              <div className="form-tak">
                <label> نام شهر </label>
                <Field name="name" component="input" label=" نام" />
              </div>
              <div className="form-tak">
                <label> نام انگلیسی </label>
                <Field name="enName" component="input" label=" نام انگلیسی " />
              </div>
              <div className="form-tak">
                <label>موقعیت X</label>
                <Field name="lat" component="input" type="number" label="X" disabled />
              </div>
              <div className="form-tak">
                <label>موقعیت Y</label>
                <Field name="lng" component="input" type="number" label="Y" disabled />
              </div>
            </div>

            {this.renderError()}

            <div className="chapchin width-same">
              <button type="submit" disabled={submitting} className="dogme i-round i-sabz">
                ذخیره
              </button>
              <span onClick={this.props.history.goBack} className="dogme i-round i-tosi">
                {" "}
                بازگشت{" "}
              </span>
            </div>
          </form>
          <br />
          <Map center={[54.399883, 32.159084]} zoom={[4]} onDragEnd={this.onDragEnd.bind(this)} />
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  return errors;
};

addCityModal = reduxForm({
  form: "addCityModal",
  validate
})(addCityModal);

export default connect(
  null,
  { addCity }
)(addCityModal);
