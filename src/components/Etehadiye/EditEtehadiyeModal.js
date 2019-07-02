import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import {
  updateEtehadiye,
  getCities,
  getStates,
  getParishes,
  getOtaghAsnafs,
  getOtaghAsnaf,
  getOtaghBazarganis,
  UPDATE_ETEHADIYE,
  GET_SELECTED_OTAGH_ASNAF
} from "../../actions";
import Map from "../Utils/MapBox";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";
import {
  OtaghBazarganiSelectErr,
  CitySelectErr,
  ParishSelectErr,
  OstanSelectErr,
  OtaghAsnafSelectErr
} from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";
import SelectForm from "../Utils/SelectForm";

class EditEtehadiyeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: [],
      location: null,
      city: null,
      state: null,
      parish: null,
      otaghBazargani: null,
      otaghAsnaf: null,
      address: {}
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  async componentDidMount() {
    await this.props.getStates();
    await this.props.getCities();
    await this.props.getParishes();
    await this.props.getOtaghBazarganis();
    await this.props.getOtaghAsnafs();

    if (this.props.initialValues) {
      const { state, city, parish, otaghBazargani, otaghAsnaf, address, location } = this.props.initialValues;
      this.setState({
        address,
        state,
        city,
        parish,
        otaghBazargani,
        otaghAsnaf,
        location
      });
      this.props.dispatch(change("EditEtehadiyeModal", "lat", location.coordinates[1]));
      this.props.dispatch(change("EditEtehadiyeModal", "lng", location.coordinates[0]));
      this.props.dispatch(change("EditEtehadiyeModal", "text", address.text));
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
  onSubmitForm(v) {
    let { parish, err, state, city, address, otaghBazargani, otaghAsnaf } = this.state;
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
      return this.setState({ err: [...err, OtaghAsnafSelectErr] });
    }
    this.setState({ err: [] });
    this.props.updateEtehadiye({ ...v, state, city, parish, address, otaghBazargani, otaghAsnaf }).then(resp => {
      if (resp.type === UPDATE_ETEHADIYE) this.props.history.goBack();
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
    this.props.dispatch(change("EditEtehadiyeModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("EditEtehadiyeModal", "lng", e.getLatLng().lng));
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

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      cities: { cities },
      states: { states },
      parishes: { parishes },
      otaghBazarganis: { otaghBazarganis },
      otaghAsnafs: { otaghAsnafs }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              <Field name="_id" component={RenderField} label=" آی دی " validate={required} disabled />
              <Field name="name" component={RenderField} label="نام مرکز" validate={required} />
              <Field name="enName" component={RenderField} label="نام انگلیسی" validate={required} />
              <Field name="text" component={RenderField} label="آدرس " validate={required} />
              <Field name="credit" component={RenderField} label="اعتبار" type="number" />
              <Field
                name="lat"
                component={RenderField}
                type="number"
                validate={[required]}
                label="latitude"
                wrapper="quadri"
                disabled
              />
              <Field
                name="lng"
                component={RenderField}
                type="number"
                validate={[required]}
                label="longitude"
                wrapper="quadri"
                disabled
              />
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
          <br />
          <Map onDragEnd={this.onDragEnd} mySearchBox={true} setPolygon={this.setPolygon} location={this.state.location} />
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  return errors;
};

EditEtehadiyeModal = reduxForm({
  form: "EditEtehadiyeModal",
  validate
})(EditEtehadiyeModal);

const mps = ({ etehadiyes, cities, states, parishes, otaghBazarganis, otaghAsnafs, auth }, props) => {
  let etehadiye = _.find(etehadiyes.etehadiyes, cnt => cnt._id === props.match.params.id);
  return { initialValues: etehadiye, cities, states, parishes, otaghBazarganis, otaghAsnafs, auth };
};

export default connect(
  mps,
  { updateEtehadiye, getCities, getStates, getParishes, getOtaghAsnafs, getOtaghAsnaf, getOtaghBazarganis }
)(EditEtehadiyeModal);
