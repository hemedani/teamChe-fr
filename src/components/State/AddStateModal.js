import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, FieldArray, change } from "redux-form";
import ScrollLock from "react-scrolllock";
import { addState, ADD_STATE } from "../../actions";
import _ from "lodash";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";
import Map from "../Utils/MapBox";
class AddStateModal extends Component {
  constructor(props) {
    super(props);
    this.state = { err: null, polygon: null };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setPolygon = this.setPolygon.bind(this);
  }

  onSubmitForm(v) {
    const { polygon } = this.state;
    if (polygon) {
      this.setState({ err: null });
      this.props.addState({ ...v, polygon }).then(resp => {
        if (resp.type === ADD_STATE) {
          this.props.history.push("/manage/states");
        }
      });
    } else {
      this.setState({ err: ["لطفا محیط منطقه را هم با ابزار کنار نقشه مکشید"] });
    }
  }
  setPolygon(event) {
    let polygon;
    if (event.type === "draw:created") {
      polygon = event.layer.toGeoJSON().geometry;
    }
    if (event.type === "draw:edited") {
      polygon = event.layers.toGeoJSON().features[0].geometry;
    }
    this.setState({ polygon });
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
    this.props.dispatch(change("AddStateModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("AddStateModal", "lng", e.getLatLng().lng));
  }

  render() {
    const { handleSubmit, submitting } = this.props;

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
            </div>

            {this.renderError()}

            <div className="chapchin width-same">
              <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                ذخیره
              </button>

              <span onClick={this.props.history.goBack} className="dogme i-round i-abi">
                بازگشت
              </span>
            </div>
          </form>
          <br />
          <Map onDragEnd={this.onDragEnd} mySearchBox={true} drawTools setPolygon={this.setPolygon} />
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

AddStateModal = reduxForm({ form: "AddStateModal", validate })(AddStateModal);

export default connect(
  null,
  { addState }
)(AddStateModal);
