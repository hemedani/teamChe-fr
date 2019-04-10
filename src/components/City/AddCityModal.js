import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import Select from "react-select";
import _ from "lodash";
import { addCity, getStates, ADD_CITY } from "../../actions";
import { RenderField, required } from "../Utils/FormField";
import Map from "../Utils/MapBox";
import { PolygonSelectErr, OstanSelectErr } from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "gray"
  })
};

class AddCityModal extends Component {
  constructor(props) {
    super(props);
    this.state = { err: [], polygon: null, state: null, location: null };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setPolygon = this.setPolygon.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
  }

  componentDidMount() {
    this.props.getStates();
  }

  onSubmitForm(v) {
    const { polygon, err, state } = this.state;
    if (!state) {
      return this.setState({ err: [...err, OstanSelectErr] });
    }
    if (!polygon) {
      return this.setState({ err: [...err, PolygonSelectErr] });
    }

    this.setState({ err: [] });
    this.props.addCity({ ...v, polygon, state }).then(resp => {
      if (resp.type === ADD_CITY) {
        this.props.history.push("/manage/city");
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
    this.props.dispatch(change("AddCityModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("AddCityModal", "lng", e.getLatLng().lng));
  }

  handeStateSelect({ _id, location }) {
    let { err } = this.state;
    const index = err.indexOf(OstanSelectErr);
    const newErr = immutableSplice(err, index, 1);

    this.setState({ state: _id, location, err: newErr });
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
      states: { states }
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
              <div className="triad center-flex">
                <label>استان</label>
                <Select
                  styles={customStyles}
                  name="state"
                  rtl={true}
                  placeholder="یک استان انتخاب کنید"
                  onChange={this.handeStateSelect}
                  options={states}
                  value={states.filter(({ _id }) => _id === this.state.state)}
                  getOptionLabel={this.returnLabel}
                  getOptionValue={this.returnValue}
                />
              </div>
            </div>

            {this.renderError()}

            <div className="chapchin width-same">
              <button type="submit" disabled={submitting} className="dogme i-round i-sabz">
                ذخیره
              </button>
              <span onClick={this.props.history.goBack} className="dogme i-round i-tosi">
                بازگشت
              </span>
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

AddCityModal = reduxForm({
  form: "AddCityModal",
  validate
})(AddCityModal);

const msp = ({ states }) => ({ states });

export default connect(
  msp,
  { addCity, getStates }
)(AddCityModal);
