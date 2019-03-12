import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, reduxForm, change, initialize, FieldArray } from "redux-form";
import {
  updateCenter,
  getCities,
  getWareTypes,
  getRastes,
  getOptions,
  centerUploadPic,
  getEditedCenter,
  CENTER_UPDATE,
  GET_CITIES,
  GET_EDITED_CENTER,
  RU
} from "../../actions";
import cx from "classnames";
import ScrollLock from "react-scrolllock";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";

import Map from "../Utils/MapBox";

const renderPhones = ({ fields, meta: { error } }) => (
  <div className="form-item with-btn">
    <span onClick={() => fields.push()} className="dogme i-round i-sabz round-small top-obs-btn">
      افزودن شماره{" "}
    </span>
    {fields.map((ph, index) => (
      <Field
        key={index}
        name={ph}
        component={RenderField}
        type="number"
        label={`شماره ${index + 1}`}
        wrapper="quadri"
        removeArray={true}
        fields={fields}
        index={index}
      />
    ))}
  </div>
);

class EditCenterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 32.159084, lng: 54.399883 },
      location: { lat: 32.159084, lng: 54.399883 },
      zoom: 5,
      city: {},

      options: [],
      wareTypes: [],
      rastes: []
    };
  }
  componentWillMount() {
    this.props.getEditedCenter(this.props.match.params.id).then(resp => {
      if (resp.type === GET_EDITED_CENTER) {
        this.props.dispatch(initialize("EditCenterModal", this.props.center.editedCenter));
        if (this.props.center.editedCenter.options) {
          this.setState({ options: this.props.center.editedCenter.options });
        }
        if (this.props.center.editedCenter.wareTypes) {
          this.setState({ wareTypes: this.props.center.editedCenter.wareTypes });
        }
        if (this.props.center.editedCenter.rastes) {
          this.setState({ rastes: this.props.center.editedCenter.rastes });
        }
        if (this.props.center.editedCenter.workShift) {
          this.props.dispatch(change("EditCenterModal", "startWork", this.props.center.editedCenter.workShift[0]));
          this.props.dispatch(change("EditCenterModal", "endWork", this.props.center.editedCenter.workShift[1]));
        }
        if (this.props.center.editedCenter.location) {
          this.props.dispatch(change("EditCenterModal", "lat", this.props.center.editedCenter.location.coordinates[1]));
          this.props.dispatch(change("EditCenterModal", "lng", this.props.center.editedCenter.location.coordinates[0]));
        }
        this.props.getCities().then(resp => {
          if (resp.type === GET_CITIES && this.props.center.editedCenter.city) {
            const city = _.find(this.props.cities.cities, city => city._id === this.props.center.editedCenter.cityRef);
            if (city) {
              this.setState({
                city,
                center: { lat: city.location.coordinates[1], lng: city.location.coordinates[0] },
                zoom: 13,
                location: {
                  lat: this.props.center.editedCenter.location.coordinates[1],
                  lng: this.props.center.editedCenter.location.coordinates[0]
                }
              });
              this.props.dispatch(change("EditCenterModal", "city", city._id));
            }
          }
        });
      }
    });
    this.props.getWareTypes();
    this.props.getRastes();
    this.props.getOptions();
  }

  onSubmitForm({
    _id,
    name,
    enName,
    lat,
    lng,
    startWork,
    endWork,
    phone,
    discount,
    address,
    premium,
    onlineShop,
    desctiption
  }) {
    const { options, wareTypes, rastes, city } = this.state;
    this.props
      .updateCenter({
        _id,
        name,
        enName,
        lat,
        lng,
        startWork,
        endWork,
        phone,
        discount,
        address,
        premium,
        onlineShop,
        desctiption,
        city,
        options,
        wareTypes,
        rastes
      })
      .then(resp => {
        if (resp.type === CENTER_UPDATE) this.props.history.goBack();
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

  onDragEnd(e) {
    this.props.dispatch(change("EditCenterModal", "lat", e.lngLat.lat));
    this.props.dispatch(change("EditCenterModal", "lng", e.lngLat.lng));
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, center } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          {center.editedCenterLoading ? (
            <DotLoader height={"20rem"} />
          ) : (
            <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
              <div className="form-item">
                <Field name="_id" component={RenderField} label=" آی دی" disabled />
                <Field name="name" component={RenderField} label="نام مرکز" validate={required} />
                <Field name="enName" component={RenderField} label="نام انگلیسی" />
                <Field name="address" component={RenderField} label="آدرس" validate={required} />
                <Field name="startWork" component={RenderField} type="number" label="شروع کار" wrapper="quintuplet" />
                <Field name="endWork" component={RenderField} type="number" label="پایان کار" wrapper="quintuplet" />
                <Field name="discount" component={RenderField} type="number" label="درصد تخفیف" wrapper="quintuplet" />

                <Field name="premium" component={RenderField} type="checkbox" label="ویژه" wrapper="quintuplet checkbox" />
                <Field
                  name="onlineShop"
                  component={RenderField}
                  type="checkbox"
                  label="آنلاین"
                  wrapper="quintuplet checkbox"
                />

                <div className="form-tak taki">
                  <label>توضیحات</label>
                  <Field name="desctiption" component="textarea" label="آدرس" />
                </div>
              </div>
              <br />
              <hr />

              <FieldArray name="phone" component={renderPhones} />
              <hr />
              <div className="selec-box-wrapper minimal-select">
                <div className="lead-selec-box">
                  <span>امکانات فروشگاه</span>
                </div>
                {this.props.options.options.map(option => (
                  <div
                    className={cx("select-box minimal", { "active-select-box": _.some(this.state.options, option) })}
                    key={option._id}
                    onClick={() => {
                      let { options } = this.state;
                      options = _.xorBy(options, [option], "_id");
                      this.setState({ options });
                    }}
                  >
                    {option.pic ? (
                      <img src={`${RU}/pic/orginal/${option.pic}`} className="pinteb-icon-img" />
                    ) : (
                      <span className="pinteb-icon icon-atari" />
                    )}
                    <div>{option.name}</div>
                  </div>
                ))}
              </div>

              <hr />

              <div className="selec-box-wrapper minimal-select">
                <div className="lead-selec-box">
                  <span>انواع محصول</span>
                </div>
                {this.props.wareTypes.wareTypes.map(wareType => (
                  <div
                    className={cx("select-box minimal", { "active-select-box": _.some(this.state.wareTypes, wareType) })}
                    key={wareType._id}
                    onClick={() => {
                      let { wareTypes } = this.state;
                      wareTypes = _.xorBy(wareTypes, [wareType], "_id");
                      this.setState({ wareTypes });
                    }}
                  >
                    {wareType.pic ? (
                      <img src={`${RU}/pic/orginal/${wareType.pic}`} className="pinteb-icon-img" />
                    ) : (
                      <span className="pinteb-icon icon-atari" />
                    )}
                    <div>{wareType.name}</div>
                  </div>
                ))}
              </div>

              <hr />

              <div className="selec-box-wrapper minimal-select">
                <div className="lead-selec-box">
                  <span>انواع فروشگاه</span>
                </div>
                {this.props.rastes.rastes.map(raste => (
                  <div
                    className={cx("select-box minimal", { "active-select-box": _.some(this.state.rastes, raste) })}
                    key={raste._id}
                    onClick={() => {
                      let { rastes } = this.state;
                      rastes = _.xorBy(rastes, [raste], "_id");
                      this.setState({ rastes });
                      console.log("rastes ", rastes);
                    }}
                  >
                    {raste.pic ? (
                      <img src={`${RU}/pic/orginal/${raste.pic}`} className="pinteb-icon-img" />
                    ) : (
                      <span className="pinteb-icon icon-atari" />
                    )}
                    <div>{raste.name}</div>
                  </div>
                ))}
              </div>

              <hr />

              <div className="selec-box-wrapper minimal-select">
                <div className="lead-selec-box">
                  <span>علامت ها</span>
                </div>
              </div>

              <hr />
              <div className="form-item">
                <Field
                  name="lat"
                  component={RenderField}
                  type="number"
                  label="latitude"
                  validate={required}
                  wrapper="quadri"
                />
                <Field
                  name="lng"
                  component={RenderField}
                  type="number"
                  label="longitude"
                  validate={required}
                  wrapper="quadri"
                />

                <div className="form-tak">
                  <label>شهر </label>
                  <div className="form-field-div">
                    <Field
                      name="city"
                      component="select"
                      className="form-field-field"
                      onChange={e => {
                        const city = _.find(this.props.cities.cities, { _id: e.target.value });
                        this.setState({
                          center: { lat: city.location.coordinates[1], lng: city.location.coordinates[0] },
                          zoom: 13,
                          city
                        });
                      }}
                    >
                      <option />
                      {this.props.cities.cities.map((city, i) => (
                        <option key={i} value={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              </div>

              {this.renderError()}
              <div className="chapchin width-same">
                <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                  ذخیره
                </button>

                <span onClick={this.props.history.goBack} className="dogme i-round i-tosi">
                  {" "}
                  بازگشت{" "}
                </span>
              </div>
            </form>
          )}
          <br />
          {/* <div className='naghshe'>
              <MyMapComponent
                googleMapURL={GoogleMapURL}
                center={this.state.center}
                location={this.state.location}
                zoom={this.state.zoom}
                dragMarker={this.dragMarker.bind(this)}
                loadingElement={<DotLoader height={{ height: `100%`, borderRaduis: '0.7rem' }}/>}
                containerElement={<div style={{ height: `100%`, borderRaduis: '0.7rem' }} />}
                mapElement={<div style={{ height: `100%`, borderRaduis: '0.7rem' }} />}
              />
          </div> */}

          <Map
            center={this.props.center.editedCenter.location.coordinates}
            zoom={[12]}
            onDragEnd={this.onDragEnd.bind(this)}
            GeocoderProp={true}
          />
          <br />
        </div>
        <ScrollLock />
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  return errors;
};

EditCenterModal = reduxForm({ form: "EditCenterModal", validate })(EditCenterModal);

EditCenterModal = connect(
  ({ cities, wareTypes, rastes, center, options }) => ({
    cities,
    wareTypes,
    rastes,
    center,
    options
  }),
  { updateCenter, getCities, getWareTypes, getRastes, getOptions, centerUploadPic, getEditedCenter }
)(EditCenterModal);

export default EditCenterModal;
