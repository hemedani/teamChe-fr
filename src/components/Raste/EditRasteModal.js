import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import { updateRaste, UPDATE_RASTE } from "../../actions";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";

class EditRasteModal extends Component {
  onSubmitForm({ _id, name, enName }) {
    this.props.updateRaste({ _id, name, enName }).then(resp => {
      if (resp.type === UPDATE_RASTE) this.props.history.goBack();
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

EditRasteModal = reduxForm({
  form: "EditRasteModal",
  validate
})(EditRasteModal);

const mps = ({ rastes }, props) => {
  let raste = _.find(rastes.rastes, cnt => cnt._id === props.match.params.id);
  return { initialValues: raste };
};

export default connect(
  mps,
  { updateRaste }
)(EditRasteModal);
