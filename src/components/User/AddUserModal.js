import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import { addUser, ADD_USER } from "../../actions";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required, email, number } from "../Utils/FormField";

class AddUserModal extends Component {
  onSubmitForm(user) {
    this.props.addUser(user).then(resp => {
      if (resp.type === ADD_USER) this.props.history.goBack();
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
              <Field name="email" component={RenderField} label=" ایمیل" validate={[required, email]} />
              <Field name="name" component={RenderField} label=" نام" validate={required} />
              <Field name="familyName" component={RenderField} label=" نام خانوادگی" validate={required} />
              <Field name="phone" component={RenderField} label=" تلفن" validate={[required, number]} />
              <Field name="password" component={RenderField} label=" رمز عبور" type="password" validate={required} />
              <Field name="doctor" component={RenderField} label=" دکتر " type="checkbox" />
              <Field name="phoneValidate" component={RenderField} label=" شماره معتبر " type="checkbox" />

              <div className="form-tak taki">
                <label>سطح دسترسی </label>
                <div className="form-field-div">
                  <Field name="level" component="select" className="form-field-field">
                    <option />
                    <option value="normal">معمولی</option>
                    <option value="expert">کارشناس</option>
                    <option value="owner">مالک</option>
                    <option value="editor">ویرایشگر</option>
                    <option value="auther">نویسنده</option>
                    <option value="admin">مدیر</option>
                  </Field>
                </div>
              </div>
            </div>

            {this.renderError()}
            <div className="chapchin width-same">
              <button type="submit" className="dogme i-round i-abi" disabled={submitting}>
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

AddUserModal = reduxForm({ form: "AddUserModal" })(AddUserModal);

export default connect(
  null,
  { addUser }
)(AddUserModal);
