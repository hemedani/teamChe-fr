/*global google*/
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change, FieldArray } from "redux-form";
import Dropzone from "react-dropzone";
import ScrollLock from "react-scrolllock";
import Map from "../Utils/MapBox";
import {
  addCenter,
  getCities,
  getWareTypes,
  getRastes,
  getOptions,
  centerUploadPic,
  getDoctorUser,
  cleanPicUpPercent,
  API_KEY2,
  ADD_CENTER,
  RU
} from "../../actions";

import { RenderField, required } from "../Utils/FormField";
import cx from "classnames";
import ProgressBar from "../Utils/ProgressBar";

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
        removeArray={true}
        label={`شماره ${index + 1}`}
        wrapper="quadri"
        fields={fields}
        index={index}
      />
    ))}
  </div>
);

class addCenterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 32.159084, lng: 54.399883 },
      zoom: 5,
      city: {},

      options: [],
      wareTypes: [],
      rastes: [],

      files: [],

      user: "",

      err: true,
      peygham: []
    };
  }
  componentDidMount() {
    this.props.getCities();
    this.props.getWareTypes();
    this.props.getRastes();
    this.props.getOptions();
    this.props.getDoctorUser();
    this.props.cleanPicUpPercent();
  }

  onDrop(files) {
    this.setState({ files });
    this.props.centerUploadPic({ files });
  }

  onSubmitForm(v) {
    const { options, wareTypes, rastes, city, user } = this.state;
    const { picsUploaded } = this.props.centers;

    this.props.addCenter({ ...v, options, wareTypes, rastes, city, user, picsUploaded }).then(resp => {
      if (resp.type === ADD_CENTER) {
        this.props.history.push("/manage/center");
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

  onDragEnd(e) {
    this.props.dispatch(change("addCenterModal", "lat", e.lngLat.lat));
    this.props.dispatch(change("addCenterModal", "lng", e.lngLat.lng));
  }

  componentWillUnmount() {
    this.props.cleanPicUpPercent();
  }
  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          {/* <form onSubmit={this.handleSubmitPic}>
            <input type="file" onChange={this.handleImageChange} />

            <div className='chapchin width-same'>
              {this.props.wareTypes.picLoading ? ( <div className='vorod-bargozari'> <Loader /> </div> ) :
              ( <button type="submit" className='dogme i-round i-abi' disabled={this.state.err} onClick={this.handleSubmitPic}>بارگزاری عکس</button> )}
            </div>

            {this.state.peygham.map((pey, i) => (<div className='ekhtar' key={i}>{pey}</div>))}
          </form>

          <div className='ghab-aks-darbar'>
            <div className='ghab-aks'>
              {$imagePreview}
            </div>
          </div> */}

          <section>
            {!this.props.centers.picLoading && (
              <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)} className="dropzone-styl">
                  <p>عکس هاتون رو به اینجا بکشید، یا کلیک کنید و اونها رو انتخاب کنید</p>
                </Dropzone>
              </div>
            )}
            <aside>
              <h2>عکسها</h2>

              <div className="prog-bar" style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-around" }}>
                {this.state.files.map((f, i) => {
                  let percentObj = _.find(this.props.centers.picUpPercent, { i: i }) || {};
                  let percent = 0;
                  if (percentObj.percent) {
                    percent = percentObj.percent;
                  }
                  if (percent === 100) {
                    return null;
                  } else {
                    return <ProgressBar key={i} percent={percent} img={f.preview} pcolor="#e86704" scale="10rem" />;
                  }
                })}
              </div>
              {/* <div className="prog-bar" style={{display: 'flex', flexFlow: 'row wrap'}}>
                <ProgressBar percent={60}/>
                <ProgressBar percent={20}/>
                <ProgressBar percent={90}/>
              </div> */}
              <hr />
              <div className="uploaded-pic-wrapper">
                {this.props.centers.picsUploaded.map(upPic => (
                  <div key={upPic.name}>
                    <div className="image">
                      <img src={`${RU}/pic/orginal/${upPic.name}`} alt="upPic.name" />
                    </div>
                    <span className="pinteb-icon icon-check" />
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              {/* <Field name="pic" component={RenderField} label='تصویر' disabled/>
              <Field name="picRef" component={RenderField} label='تصویر' disabled/> */}
              <Field name="name" component={RenderField} label="نام مرکز" validate={required} />
              <Field name="enName" component={RenderField} label="نام انگلیسی" />
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

              <div className="form-tak">
                <label>آدرس</label>
                <Field name="address" component="textarea" placeholder="آدرس" />
              </div>
              <div className="form-tak">
                <label>توضیحات</label>
                <Field name="desctiption" component="textarea" placeholder="توضیحات" />
              </div>
            </div>
            <br />
            <hr />

            <FieldArray name="phone" component={renderPhones} />

            <hr />

            <div className="form-item">
              <Field name="telegram" component={RenderField} label="تلگرام" wrapper="quadri" ltr />
              <Field name="instagram" component={RenderField} label="اینستگرام" wrapper="quadri" ltr />
              <Field name="email" component={RenderField} label="ایمیل" wrapper="quadri" ltr />
              <Field name="website" component={RenderField} label="وب سایت" wrapper="quadri" ltr />
            </div>

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
                <span>اختصاص طبیب</span>
              </div>
              {this.props.users.users.map(user => (
                <div
                  className={cx("select-box minimal", { "active-select-box": this.state.user === user._id })}
                  key={user._id}
                  onClick={() => {
                    if (this.state.user === user._id) {
                      this.setState({ user: "" });
                    } else {
                      this.setState({ user: user._id });
                    }
                  }}
                >
                  {user.pic ? (
                    <img src={`${RU}/pic/orginal/${user.pic}`} className="pinteb-icon-img" />
                  ) : (
                    <img src={`../../../img/m-user.png`} className="pinteb-icon-img" />
                  )}
                  <div>
                    {" "}
                    {user.name} {user.familyName}
                  </div>
                </div>
              ))}
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

            {this.renderError()}
            <div className="chapchin width-same">
              <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                ذخیره
              </button>

              <Link to={`/manage/center`} className="dogme i-round i-ghermez">
                {" "}
                بازگشت{" "}
              </Link>
            </div>
          </form>
          <br />
          {/*<div className='naghshe'>
              <MyMapComponent
                googleMapURL={GoogleMapURL}
                center={this.state.center}
                zoom={this.state.zoom}

                onMapMounted={this.onMapMounted}
                onBoundsChanged={this.onBoundsChanged}

                onSearchBoxMounted={this.onSearchBoxMounted}
                bounds={this.bounds}
                onPlacesChanged={this.onPlacesChanged}

                dragMarker={this.dragMarker.bind(this)}
                loadingElement={<div style={{ height: `100%`, borderRaduis: '0.7rem' }} />}
                containerElement={<div style={{ height: `100%`, borderRaduis: '0.7rem' }} />}
                mapElement={<div style={{ height: `100%`, borderRaduis: `0.7rem` }} />}
              />
                </div>*/}
          {/* <div className='naghshe'>
              <MapWithASearchBox
                center={this.state.center}
                dragMarker={this.dragMarker.bind(this)}
              />
            </div> */}
          <Map center={[54.399883, 32.159084]} zoom={[4]} onDragEnd={this.onDragEnd.bind(this)} GeocoderProp={true} />
        </div>

        <ScrollLock />
      </div>
    );
  }
}

addCenterModal = reduxForm({ form: "addCenterModal" })(addCenterModal);

const mps = ({ cities, wareTypes, rastes, options, users, centers }) => ({
  cities,
  wareTypes,
  rastes,
  options,
  users,
  centers
});

export default connect(
  mps,
  { addCenter, getCities, getWareTypes, getRastes, getOptions, centerUploadPic, getDoctorUser, cleanPicUpPercent }
)(addCenterModal);
