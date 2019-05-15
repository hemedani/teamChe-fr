import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import _ from "lodash";
import { addParish, getStates, getCities, ADD_PARISH } from "../../actions";
import { RenderField, required } from "../Utils/FormField";
import Map from "../Utils/MapBox";
import { PolygonSelectErr, OstanSelectErr, CitySelectErr } from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";
import SelectForm from "../Utils/SelectForm";
import DotLoader from "../Utils/DotLoader";

class AddParishModal extends Component {
  constructor(props) {
    super(props);
    this.state = { err: [], polygon: null, state: null, location: null, city: null };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setPolygon = this.setPolygon.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
  }

  componentDidMount() {
    this.props.getStates();
    this.props.getCities();
  }

  onSubmitForm(v) {
    const { polygon, err, state, city } = this.state;
    if (!state) {
      return this.setState({ err: [...err, OstanSelectErr] });
    }
    if (!polygon) {
      return this.setState({ err: [...err, PolygonSelectErr] });
    }
    if (!city) {
      return this.setState({ err: [...err, CitySelectErr] });
    }

    this.setState({ err: [] });
    const fullPath = `${_.find(this.props.states.states, { _id: state }).name} - ${
      _.find(this.props.cities.cities, { _id: city }).name
    } - ${v.name}`;
    this.props.addParish({ ...v, polygon, state, city, fullPath }).then(resp => {
      if (resp.type === ADD_PARISH) {
        this.props.history.push("/manage/parish");
      }
    });
  }
  setPolygon(event) {
    let polygon;
    let { err } = this.state;
    const index = err.indexOf(PolygonSelectErr);
    const newErr = immutableSplice(err, index, 1);

    if (event.type === "draw:created") {
      polygon = event.layer.toGeoJSON().geometry;
    }
    if (event.type === "draw:edited") {
      polygon = event.layers.toGeoJSON().features[0].geometry;
    }
    this.setState({ polygon, err: newErr });
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
    this.props.dispatch(change("AddParishModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("AddParishModal", "lng", e.getLatLng().lng));
  }

  handeStateSelect({ _id, location }, stateKey, errStr) {
    let { err } = this.state;
    const index = err.indexOf(errStr);
    const newErr = immutableSplice(err, index, 1);
    if (stateKey === "state") {
      this.props.getCities(_id);
    }
    this.setState({ [stateKey]: _id, location, err: newErr });
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
      states: { states },
      cities: { cities }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <form onSubmit={handleSubmit(this.onSubmitForm)}>
            <div className="form-item">
              <Field name="name" component={RenderField} label="نام" validate={[required]} />
              <Field name="enName" component={RenderField} label=" نام انگلیسی " validate={[required]} />

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
            </div>
            {this.renderError()}
            <div className="chapchin width-same">
              {this.props.parishes.parishLoading ? (
                <DotLoader height="3rem" width="8rem" />
              ) : (
                <div className="center-flex">
                  <button type="submit" disabled={submitting} className="dogme i-round i-sabz">
                    ذخیره
                  </button>
                  <span onClick={this.props.history.goBack} className="dogme i-round i-tosi">
                    بازگشت
                  </span>
                </div>
              )}
            </div>
          </form>
          <br />
          <Map
            onDragEnd={this.onDragEnd}
            mySearchBox={true}
            drawTools
            setPolygon={this.setPolygon}
            location={this.state.location}
          />
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  return errors;
};

AddParishModal = reduxForm({
  form: "AddParishModal",
  validate
})(AddParishModal);

const msp = ({ states, cities, parishes }) => ({ states, cities, parishes });

export default connect(
  msp,
  { addParish, getStates, getCities }
)(AddParishModal);
