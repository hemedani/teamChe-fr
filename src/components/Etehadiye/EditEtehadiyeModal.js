import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import { updateEtehadiye, UPDATE_ETEHADIYE } from "../../actions";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";

class EditEtehadiyeModal extends Component {
  onSubmitForm(etehadiye) {
    this.props.updateEtehadiye(etehadiye).then(resp => {
      if (resp.type === UPDATE_ETEHADIYE) this.props.history.goBack();
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

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              <Field name="_id" component={RenderField} label=" آی دی " validate={required} />
              <Field name="name" component={RenderField} label="نام مرکز" validate={required} />
              <Field name="enName" component={RenderField} label="نام انگلیسی" validate={required} />
              <Field name="credit" component={RenderField} label="اعتبار" type="number" />
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

const mps = ({ etehadiyes }, props) => {
  let etehadiye = _.find(etehadiyes.etehadiyes, cnt => cnt._id === props.match.params.id);
  return { initialValues: etehadiye };
};

export default connect(
  mps,
  { updateEtehadiye }
)(EditEtehadiyeModal);
