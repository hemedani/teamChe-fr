import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import { updateEtehadiye, UPDATE_ETEHADIYE } from "../../actions";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";

class EditEtehadiyeModal extends Component {
  onSubmitForm({ _id, name, enName }) {
    this.props.updateEtehadiye({ _id, name, enName }).then(resp => {
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
              <div className="form-tak">
                <label> آی دی </label>
                <Field name="_id" component="input" label=" آی دی " disabled />
              </div>
              <div className="form-tak">
                <label> نام </label>
                <Field name="name" component="input" label=" نام" />
              </div>
              <div className="form-tak">
                <label> نام انگلیسی </label>
                <Field name="enName" component="input" label=" نام انگلیسی " />
              </div>
            </div>

            {this.renderError()}
            <div className="chapchin width-same">
              <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                ذخیره
              </button>

              <span onClick={this.props.history.goBack} className="dogme i-round i-tosi">
                {" "}
                بازگشت{" "}
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
