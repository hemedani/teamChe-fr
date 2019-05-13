import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, reduxForm, change, initialize, FieldArray } from "redux-form";
import {
  updateCenter,
  getStates,
  getCities,
  getParishes,
  getOtaghBazarganis,
  getOtaghAsnafs,
  getEtehadiyes,
  getRastes,
  getOptions,
  centerUploadPic,
  getEditedCenter,
  CENTER_UPDATE,
  GET_CITIES,
  GET_EDITED_CENTER,
  RU,
  LOAD_EDITED_CENTER
} from "../../actions";
import cx from "classnames";
import ScrollLock from "react-scrolllock";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";

import Map from "../Utils/MapBox";
import {
  OstanSelectErr,
  ParishSelectErr,
  CitySelectErr,
  OtaghBazarganiSelectErr,
  EtehadiyeSelectErr,
  OtaghAsnafSelectErr,
  RasteSelectErr
} from "../../actions/Errors";
import SelectForm from "../Utils/SelectForm";
import { immutableSplice } from "../Utils/Imutable";

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
      etPic: "",

      user: "",

      err: [],
      peygham: []
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
  }
  async componentWillMount() {
    this.props.dispatch({ type: LOAD_EDITED_CENTER });
    await this.props.getStates();
    await this.props.getCities();
    await this.props.getParishes();
    await this.props.getOtaghAsnafs();
    await this.props.getOtaghBazarganis();
    await this.props.getEtehadiyes();
    await this.props.getRastes();
    await this.props.getOptions();
    this.props.getEditedCenter(this.props.match.params.id).then(resp => {
      if (resp.type === GET_EDITED_CENTER) {
        this.props.dispatch(initialize("EditCenterModal", this.props.center.editedCenter));
        this.props.dispatch(change("EditCenterModal", "text", this.props.center.editedCenter.address.text));
        this.props.dispatch(change("EditCenterModal", "startWork", this.props.center.editedCenter.workShift[0]));
        this.props.dispatch(change("EditCenterModal", "endWork", this.props.center.editedCenter.workShift[1]));
        this.props.dispatch(change("EditCenterModal", "lat", this.props.center.editedCenter.location.coordinates[1]));
        this.props.dispatch(change("EditCenterModal", "lng", this.props.center.editedCenter.location.coordinates[0]));
        const {
          location = null,
          city = null,
          state = null,
          parish = null,
          otaghBazargani = null,
          otaghAsnaf = null,
          etehadiye = null,
          raste = null,
          options = [],

          address = {},

          etPic = ""
        } = this.props.center.editedCenter;

        this.setState({
          location,
          city,
          state,
          parish,
          otaghBazargani,
          otaghAsnaf,
          etehadiye,
          options,
          raste,
          address,
          etPic
        });
      }
    });
  }

  onSubmitForm(inp) {
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
    this.props
      .updateCenter({ ...inp, state, city, parish, address, otaghBazargani, otaghAsnaf, etehadiye, raste, etPic })
      .then(resp => {
        if (resp.type === CENTER_UPDATE) this.props.history.goBack();
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
    this.props.dispatch(change("EditCenterModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("EditCenterModal", "lng", e.getLatLng().lng));
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
      this.props.getOtaghAsnafs({ bargozariId: _id });
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
      rastes: { rastes },
      center
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          {center.editedCenterLoading ? (
            <DotLoader height={"20rem"} />
          ) : (
            <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
              <div className="form-item">
                <Field name="_id" component={RenderField} label="آی دی" validate={required} disabled />
                <Field name="name" component={RenderField} label="نام مرکز" validate={required} />
                <Field name="enName" component={RenderField} label="نام انگلیسی" />
                <Field
                  name="startWork"
                  component={RenderField}
                  type="number"
                  label="شروع کار"
                  wrapper="quintuplet"
                  validate={required}
                />
                <Field
                  name="endWork"
                  component={RenderField}
                  type="number"
                  label="پایان کار"
                  wrapper="quintuplet"
                  validate={required}
                />
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
                />
                <Field
                  name="lng"
                  component={RenderField}
                  type="number"
                  label="longitude"
                  validate={required}
                  wrapper="quadri"
                />
              </div>

              {this.renderError()}
              <div className="chapchin width-same">
                <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                  ذخیره
                </button>

                <span onClick={this.props.history.goBack} className="dogme i-round i-tosi">
                  بازگشت
                </span>
              </div>
            </form>
          )}
          <br />

          <Map onDragEnd={this.onDragEnd} mySearchBox={true} location={this.state.location} />
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
  center
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
  center
});

EditCenterModal = connect(
  mps,
  {
    updateCenter,
    getStates,
    getCities,
    getParishes,
    getOtaghBazarganis,
    getOtaghAsnafs,
    getEtehadiyes,
    getRastes,
    getOptions,
    centerUploadPic,
    getEditedCenter
  }
)(EditCenterModal);

export default EditCenterModal;
