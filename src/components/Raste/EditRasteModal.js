import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import { updateRaste, getEtehadiyes, getOtaghAsnafs, UPDATE_RASTE } from "../../actions";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";
import SelectForm from "../Utils/SelectForm";
import { EtehadiyeSelectErr, OtaghAsnafSelectErr } from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";

class EditRasteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      peygham: [],
      err: [],
      etehadiye: null,
      otaghAsnaf: null,
      picErr: true
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
  }

  componentDidMount() {
    this.props.getEtehadiyes();
    this.props.getOtaghAsnafs();
    if (this.props.initialValues) {
      this.setState({ etehadiye: this.props.initialValues.etehadiye, otaghAsnaf: this.props.initialValues.otaghAsnaf });
    }
    if (this.props.auth.user.asOrganization) {
      this.setState({ otaghAsnaf: this.props.auth.user.asOrganization });
    }
  }

  onSubmitForm(v) {
    const { err, etehadiye, otaghAsnaf } = this.state;
    if (!etehadiye) {
      return this.setState({ err: [...err, EtehadiyeSelectErr] });
    }
    if (!otaghAsnaf) {
      return this.setState({ err: [...err, OtaghAsnafSelectErr] });
    }
    this.props.updateRaste({ ...v, etehadiye, otaghAsnaf }).then(resp => {
      if (resp.type === UPDATE_RASTE) this.props.history.goBack();
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

  handeStateSelect({ _id }, stateKey, errStr) {
    let { err } = this.state;
    const index = err.indexOf(errStr);
    const newErr = immutableSplice(err, index, 1);

    this.setState({ [stateKey]: _id, err: newErr });
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
      etehadiyes: { etehadiyes },
      otaghAsnafs: { otaghAsnafs }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <form onSubmit={handleSubmit(this.onSubmitForm)}>
            <div className="form-item">
              <Field name="_id" component={RenderField} label=" آی دی " validate={required} disabled />
              <Field name="name" component={RenderField} label=" نام" validate={required} />
              <Field name="enName" component={RenderField} label=" نام انگلیسی " validate={required} />
              <Field name="isic" component={RenderField} label="کد آیسیک" type="Number" validate={required} />

              <SelectForm
                itrator={etehadiyes}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.etehadiye}
                handeStateSelect={this.handeStateSelect}
                label="اتحادیه"
                stateKey="etehadiye"
                err={EtehadiyeSelectErr}
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

const mps = ({ rastes, etehadiyes, otaghAsnafs, auth }, props) => {
  let raste = _.find(rastes.rastes, cnt => cnt._id === props.match.params.id);
  return { initialValues: raste, etehadiyes, otaghAsnafs, auth };
};

export default connect(
  mps,
  { updateRaste, getEtehadiyes, getOtaghAsnafs }
)(EditRasteModal);
