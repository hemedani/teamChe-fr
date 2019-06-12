import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, initialize } from "redux-form";
import { Link, withRouter } from "react-router-dom";
import { editOwn, AUTH_USER } from "../actions";
import DotLoader from "./Utils/DotLoader";
import { RenderField, required, email, number } from "./Utils/FormField";

class EditOwnUser extends Component {
  onSubmitForm({ name, familyName }) {
    this.props.editOwn({ name, familyName }).then(resp => {
      if (resp.type === AUTH_USER) {
        this.props.history.push("/");
      }
    });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, auth } = this.props;
    return (
      <div className="ghab-vorod grid">
        <h1>فرم ویرایش کاربر</h1>
        <div className="poshtzamine">
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <Field name="name" component={RenderField} label=" نام" tak={true} validate={required} />
            <Field name="familyName" component={RenderField} label=" نام خانوادگی" tak={true} validate={required} />
            <Field name="phone" component={RenderField} label=" تلفن" tak={true} validate={[required, number]} disabled />

            {auth.error && <div className="auth-error"> {auth.error} </div>}

            {auth.loginLoading ? (
              <div className="chapchin width-same">
                <DotLoader height="3rem" width="8rem" />
              </div>
            ) : (
              <div className="chapchin width-same">
                <button type="submit" className="dogme i-round i-sabz" disabled={submitting}>
                  ثبت اطلاعات
                </button>
                <Link className="dogme i-round i-tosi" to="/">
                  رد کردن
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const validate = values => {
  let errors = {};

  return errors;
};

EditOwnUser = reduxForm({ form: "EditOwnUser", validate })(EditOwnUser);

const msp = ({ auth }) => ({ auth, initialValues: auth.user });

export default withRouter(
  connect(
    msp,
    { editOwn }
  )(EditOwnUser)
);
