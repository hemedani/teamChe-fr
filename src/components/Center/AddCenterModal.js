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
  getOtaghAsnaf,
  getEtehadiyes,
  getRastes,
  getOptions,
  centerUploadPic,
  cleanPicUpPercent,
  ADD_CENTER,
  RU,
  GET_SELECTED_OTAGH_ASNAF
} from "../../actions";

import {
  ParishSelectErr,
  OstanSelectErr,
  CitySelectErr,
  OtaghBazarganiSelectErr,
  OtaghAsnafSelectErr,
  EtehadiyeSelectErr,
  RasteSelectErr
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

      address: {},

      options: [],

      location: null,
      city: null,
      state: null,
      parish: null,
      otaghBazargani: null,
      otaghAsnaf: null,
      etehadiye: null,
      raste: null,

      files: [],

      etPic: "",

      user: "",

      err: [],
      peygham: []
    };
    this.onDrop = this.onDrop.bind(this);

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
    this.parishPromiseOptions = this.parishPromiseOptions.bind(this);
    this.setPolygon = this.setPolygon.bind(this);
    this.renderServerError = this.renderServerError.bind(this);
  }

  async componentDidMount() {
    await this.props.getStates();
    await this.props.getCities();
    await this.props.getParishes();
    await this.props.getOtaghBazarganis();
    this.props.getOtaghAsnafs();
    this.props.getEtehadiyes();
    this.props.getRastes();
    this.props.getOptions();
    this.props.cleanPicUpPercent();
    if (this.props.auth.user.asOrganization) {
      const otaghAsnaf = await this.props.getOtaghAsnaf(this.props.auth.user.asOrganization);

      if (otaghAsnaf.type === GET_SELECTED_OTAGH_ASNAF) {
        const { state, city, otaghBazargani, _id } = otaghAsnaf.payload;
        const foundedState = _.find(this.props.states.states, { _id: state });
        const foundedCity = _.find(this.props.cities.cities, { _id: city });
        const foundedOtaghBazargani = _.find(this.props.otaghBazarganis.otaghBazarganis, { _id: otaghBazargani });
        this.setState({
          otaghAsnaf: _id,
          state: foundedState._id,
          city: foundedCity._id,
          otaghBazargani: foundedOtaghBazargani._id
        });
      }
    }
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

    let { parish, err, state, city, address, otaghBazargani, otaghAsnaf, etehadiye, raste, etPic } = this.state;
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
    if (!raste) {
      return this.setState({ err: [...err, RasteSelectErr] });
    }
    this.setState({ err: [] });
    const { picsUploaded } = this.props.centers;
    this.props
      .addCenter({ ...v, state, city, parish, address, otaghBazargani, otaghAsnaf, etehadiye, picsUploaded, raste, etPic })
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

  renderServerError() {
    const { error } = this.props.centers;
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  }

  onDragEnd(e) {
    this.props.dispatch(change("addCenterModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("addCenterModal", "lng", e.getLatLng().lng));
  }
  async parishPromiseOptions(inp) {
    const getFilteredParish = await this.props.getParishes({ path: inp });
    return getFilteredParish.payload;
  }

  handeStateSelect({ _id, location, name, ...rest }, stateKey, errStr) {
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
      this.props.getOtaghAsnafs({ barzarganiId: _id });
    }

    if (stateKey === "etehadiye") {
      this.setState({
        [stateKey]: _id,
        etPic: rest.pic,
        location,
        err: newErr,
        address: { ...this.state.address, [stateKey]: name }
      });
    } else if (stateKey === "raste") {
      this.setState({ [stateKey]: _id, err: newErr });
    } else {
      this.setState({ [stateKey]: _id, location, err: newErr, address: { ...this.state.address, [stateKey]: name } });
    }
  }

  returnLabel({ name }) {
    return name;
  }

  returnValue({ _id }) {
    return _id;
  }

  setPolygon() {
    if (this.state.parish) {
      const findedParish = _.find(this.props.parishes.parishes, { _id: this.state.parish });
      const polygon = findedParish ? findedParish.polygon : null;
      return polygon;
    } else {
      return null;
    }
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
      etehadiyes: { etehadiyes },
      rastes: { rastes }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
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
              <Field name="guildId" component={RenderField} label="شناسه صنفی" validate={required} type="number" />
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
                <Field name="description" component="textarea" placeholder="توضیحات" />
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
                isDisabled={this.props.auth.user.asOrganization ? true : false}
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
                isDisabled={this.props.auth.user.asOrganization ? true : false}
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
                async
                promiseOptions={this.parishPromiseOptions}
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
                isDisabled={this.props.auth.user.asOrganization ? true : false}
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
                isDisabled={this.props.auth.user.asOrganization ? true : false}
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
              <SelectForm
                itrator={rastes}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.raste}
                handeStateSelect={this.handeStateSelect}
                label="رسته"
                stateKey="raste"
                err={RasteSelectErr}
              />
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
            {this.renderServerError()}
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
          <Map
            onDragEnd={this.onDragEnd}
            mySearchBox={true}
            drawTools
            location={this.state.location}
            polygon={this.setPolygon()}
          />
        </div>

        <ScrollLock />
      </div>
    );
  }
}

addCenterModal = reduxForm({ form: "addCenterModal" })(addCenterModal);

const mps = ({
  states,
  cities,
  parishes,
  otaghBazarganis,
  otaghAsnafs,
  etehadiyes,
  rastes,
  options,
  users,
  centers,
  auth
}) => ({
  states,
  cities,
  parishes,
  otaghBazarganis,
  otaghAsnafs,
  etehadiyes,
  rastes,
  options,
  users,
  centers,
  auth
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
    getOtaghAsnaf,
    getEtehadiyes,
    getRastes,
    getOptions,
    centerUploadPic,
    cleanPicUpPercent
  }
)(addCenterModal);
