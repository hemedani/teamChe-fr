import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import { updateOtaghAsnaf, getStates, getCities, getParishes, getOtaghBazarganis, UPDATE_OTAGH_ASNAF } from "../../actions";
import cx from "classnames";
import Map from "../Utils/MapBox";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";
import SelectForm from "../Utils/SelectForm";
import { OstanSelectErr, CitySelectErr, ParishSelectErr, OtaghBazarganiSelectErr } from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";

class EditOtaghAsnafModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: [],
      city: null,
      state: null,
      parish: null,
      otaghBazargani: null,
      address: {},
      location: null
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
  }

  async componentDidMount() {
    await this.props.getStates();
    await this.props.getCities();
    await this.props.getParishes();
    await this.props.getOtaghBazarganis();
    if (this.props.initialValues) {
      const { state, city, parish, otaghBazargani, address, location } = this.props.initialValues;
      this.setState({
        address,
        state,
        city,
        parish,
        otaghBazargani,
        location
      });
      this.props.dispatch(change("EditOtaghAsnafModal", "lat", location.coordinates[1]));
      this.props.dispatch(change("EditOtaghAsnafModal", "lng", location.coordinates[0]));
      this.props.dispatch(change("EditOtaghAsnafModal", "text", address.text));
    }
  }

  onSubmitForm(v) {
    let { parish, err, state, city, address, otaghBazargani } = this.state;
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
    this.setState({ err: [] });
    this.props.updateOtaghAsnaf({ ...v, state, city, parish, address, otaghBazargani }).then(resp => {
      if (resp.type === UPDATE_OTAGH_ASNAF) this.props.history.goBack();
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
    this.props.dispatch(change("EditOtaghAsnafModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("EditOtaghAsnafModal", "lng", e.getLatLng().lng));
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
      otaghAsnafs,
      submitting,
      history,
      cities: { cities },
      states: { states },
      parishes: { parishes },
      otaghBazarganis: { otaghBazarganis }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={history.goBack} />
        <div className="modal">
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              <Field name="name" component={RenderField} label="نام" validate={required} />
              <Field name="enName" component={RenderField} label="نام انگلیسی " validate={required} />
              <Field name="text" component={RenderField} label="آدرس " validate={required} />
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
            </div>
            {this.renderError()}
            <div className="chapchin width-same">
              {otaghAsnafs.otaghAsnafLoading ? (
                <DotLoader height="3rem" width="8rem" />
              ) : (
                <div className="center-flex">
                  <button type="submit" disabled={submitting} className="dogme i-round i-sabz">
                    ذخیره
                  </button>
                  <span onClick={history.goBack} className="dogme i-round i-tosi">
                    بازگشت
                  </span>
                </div>
              )}
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

EditOtaghAsnafModal = reduxForm({
  form: "EditOtaghAsnafModal",
  validate
})(EditOtaghAsnafModal);

const mps = ({ cities, states, parishes, otaghAsnafs, otaghBazarganis }, props) => {
  let otaghAsnaf = _.find(otaghAsnafs.otaghAsnafs, cnt => cnt._id === props.match.params.id);
  return { initialValues: otaghAsnaf, cities, states, parishes, otaghAsnafs, otaghBazarganis };
};

export default connect(
  mps,
  { updateOtaghAsnaf, getStates, getCities, getParishes, getOtaghBazarganis }
)(EditOtaghAsnafModal);
