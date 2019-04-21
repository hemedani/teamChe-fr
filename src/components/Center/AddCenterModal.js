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
  getStates,
  getCities,
  getParishes,
  getOtaghBazarganis,
  getOtaghAsnafs,
  getEtehadiyes,
  getRastes,
  getOptions,
  centerUploadPic,
  cleanPicUpPercent,
  ADD_CENTER,
  RU
} from "../../actions";

import {
  ParishSelectErr,
  OstanSelectErr,
  CitySelectErr,
  OtaghBazarganiSelectErr,
  OtaghAsnafSelectErr,
  EtehadiyeSelectErr
} from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";
import DotLoader from "../Utils/DotLoader";

import SelectForm from "../Utils/SelectForm";

import { RenderField, required } from "../Utils/FormField";
import cx from "classnames";
import ProgressBar from "../Utils/ProgressBar";

const renderPhones = ({ fields, meta: { error } }) => (
  <div className="form-item with-btn">
    <span onClick={() => fields.push()} className="dogme i-round i-sabz round-small top-obs-btn">
      افزودن شماره
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

      options: [],
      wareTypes: [],
      rastes: [],

      location: null,
      city: null,
      state: null,
      parish: null,
      otaghBazargani: null,
      otaghAsnaf: null,
      etehadiye: null,

      files: [],

      user: "",

      err: [],
      peygham: []
    };
    this.onDrop = this.onDrop.bind(this);

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
  }

  componentDidMount() {
    this.props.getStates();
    this.props.getCities();
    this.props.getParishes();
    this.props.getOtaghBazarganis();
    this.props.getOtaghAsnafs();
    this.props.getEtehadiyes();
    this.props.getRastes();
    this.props.getOptions();
    this.props.cleanPicUpPercent();
  }

  onDrop(files) {
    this.setState({ files });
    this.props.centerUploadPic({ files });
  }

  onSubmitForm(v) {
    // const { options, wareTypes, rastes, city, user } = this.state;
    // const { picsUploaded } = this.props.centers;

    // this.props.addCenter({ ...v, options, wareTypes, rastes, city, user, picsUploaded }).then(resp => {
    //   if (resp.type === ADD_CENTER) {
    //     this.props.history.push("/manage/center");
    //   }
    // });

    let { parish, err, state, city, address, otaghBazargani, otaghAsnaf, etehadiye } = this.state;
    if (!state) {
      return this.setState({ err: [...err, OstanSelectErr] });
    }
    if (!parish) {
      return this.setState({ err: [...err, ParishSelectErr] });
    }
    if (!city) {
      return this.setState({ err: [...err, CitySelectErr] });
    }
    if (!otaghBazargani) {
      return this.setState({ err: [...err, OtaghBazarganiSelectErr] });
    }
    if (!otaghAsnaf) {
      return this.setState({ err: [...err, OtaghBazarganiSelectErr] });
    }
    if (!etehadiye) {
      return this.setState({ err: [...err, EtehadiyeSelectErr] });
    }
    this.setState({ err: [] });
    const { picsUploaded } = this.props.centers;
    this.props
      .addCenter({ ...v, state, city, parish, address, otaghBazargani, otaghAsnaf, etehadiye, picsUploaded })
      .then(resp => {
        if (resp.type === ADD_CENTER) {
          this.props.history.push("/manage/center");
        }
      });
  }

  renderError() {
    const { err } = this.state;
    if (err) {
      return err.map((e, i) => (
        <div key={i} className="alert alert-danger">
          {e}
        </div>
      ));
    }
  }

  onDragEnd(e) {
    this.props.dispatch(change("addCenterModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("addCenterModal", "lng", e.getLatLng().lng));
  }

  handeStateSelect({ _id, location, name }, stateKey, errStr) {
    let { err } = this.state;
    const index = err.indexOf(errStr);
    const newErr = immutableSplice(err, index, 1);
    if (stateKey === "state") {
      this.props.getCities(_id);
      this.props.getParishes({ stateId: _id });
    }
    if (stateKey === "city") {
      this.props.getParishes({ cityId: _id });
      this.props.getOtaghBazarganis({ cityId: _id });
    }
    if (stateKey === "otaghBazargani") {
      this.props.getOtaghAsnafs({ bargozariId: _id });
    }
    this.setState({ [stateKey]: _id, location, err: newErr, address: { ...this.state.address, [stateKey]: name } });
  }
  returnLabel({ name }) {
    return name;
  }
  returnValue({ _id }) {
    return _id;
  }

  componentWillUnmount() {
    this.props.cleanPicUpPercent();
  }
  render() {
    const {
      handleSubmit,
      submitting,
      cities: { cities },
      states: { states },
      parishes: { parishes },
      otaghBazarganis: { otaghBazarganis },
      otaghAsnafs: { otaghAsnafs },
      etehadiyes: { etehadiyes }
    } = this.props;

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
                <Dropzone onDrop={this.onDrop} className="dropzone-styl">
                  {/* <p>عکس هاتون رو به اینجا بکشید، یا کلیک کنید و اونها رو انتخاب کنید</p> */}
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>عکس هاتون رو به اینجا بکشید، یا کلیک کنید و اونها رو انتخاب کنید</p>
                      </div>
                    </section>
                  )}
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

              <Field name="text" component={RenderField} label="آدرس " validate={required} />

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
              <SelectForm
                itrator={states}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.state}
                handeStateSelect={this.handeStateSelect}
                label="استان"
                stateKey="state"
                err={OstanSelectErr}
              />
              <SelectForm
                itrator={cities}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.city}
                handeStateSelect={this.handeStateSelect}
                label="شهر"
                stateKey="city"
                err={CitySelectErr}
              />
              <SelectForm
                itrator={parishes}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.parish}
                handeStateSelect={this.handeStateSelect}
                label="محله"
                stateKey="parish"
                err={ParishSelectErr}
              />
              <SelectForm
                itrator={otaghBazarganis}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.otaghBazargani}
                handeStateSelect={this.handeStateSelect}
                label="اتاق بازرگانی"
                stateKey="otaghBazargani"
                err={OtaghBazarganiSelectErr}
              />
              <SelectForm
                itrator={otaghAsnafs}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.otaghAsnaf}
                handeStateSelect={this.handeStateSelect}
                label="اتاق اصناف"
                stateKey="otaghAsnaf"
                err={OtaghAsnafSelectErr}
              />
              <SelectForm
                itrator={etehadiyes}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.etehadiye}
                handeStateSelect={this.handeStateSelect}
                label="اتحادیه"
                stateKey="etehadiye"
                err={EtehadiyeSelectErr}
              />
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
                <span>رسته صنف</span>
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
            <div className="form-item">
              <Field
                name="lat"
                component={RenderField}
                type="number"
                label="latitude"
                validate={required}
                wrapper="quadri"
                step={0.0000000000000001}
                disabled
              />
              <Field
                name="lng"
                component={RenderField}
                type="number"
                label="longitude"
                validate={required}
                wrapper="quadri"
                step={0.0000000000000001}
                disabled
              />
            </div>

            {this.renderError()}
            <div className="chapchin width-same">
              {this.props.centers.centerLoading ? (
                <DotLoader height="3rem" width="8rem" />
              ) : (
                <div className="center-flex">
                  <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                    ذخیره
                  </button>

                  <Link to={`/manage/center`} className="dogme i-round i-ghermez">
                    بازگشت
                  </Link>
                </div>
              )}
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
          <br />
          <Map onDragEnd={this.onDragEnd} mySearchBox={true} location={this.state.location} />
        </div>

        <ScrollLock />
      </div>
    );
  }
}

addCenterModal = reduxForm({ form: "addCenterModal" })(addCenterModal);

const mps = ({ states, cities, parishes, otaghBazarganis, otaghAsnafs, etehadiyes, rastes, options, users, centers }) => ({
  states,
  cities,
  parishes,
  otaghBazarganis,
  otaghAsnafs,
  etehadiyes,
  rastes,
  options,
  users,
  centers
});

export default connect(
  mps,
  {
    addCenter,
    getStates,
    getCities,
    getParishes,
    getOtaghBazarganis,
    getOtaghAsnafs,
    getEtehadiyes,
    getRastes,
    getOptions,
    centerUploadPic,
    cleanPicUpPercent
  }
)(addCenterModal);
