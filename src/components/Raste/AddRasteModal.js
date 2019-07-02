import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { addRaste, getEtehadiyes, getOtaghAsnafs, ADD_RASTE } from "../../actions";
import _ from "lodash";
import { RenderField, required } from "../Utils/FormField";
import { EtehadiyeSelectErr, OtaghAsnafSelectErr } from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";
import SelectForm from "../Utils/SelectForm";
import DotLoader from "../Utils/DotLoader";
class AddRasteModal extends Component {
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
    if (this.props.auth.user.asOrganization) {
      this.setState({ otaghAsnaf: this.props.auth.user.asOrganization });
    }
  }

  onSubmitForm(v) {
    const { err, etehadiye } = this.state;
    if (!etehadiye) {
      return this.setState({ err: [...err, EtehadiyeSelectErr] });
    }
    this.props.addRaste({ ...v, etehadiye }).then(resp => {
      if (resp.type === ADD_RASTE) {
        this.props.history.push("/manage/raste");
      }
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
      rastes,
      submitting,
      history,
      etehadiyes: { etehadiyes },
      otaghAsnafs: { otaghAsnafs }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={history.goBack} />
        <div className="modal">
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              <Field name="name" component={RenderField} label="نام" validate={required} />
              <Field name="enName" component={RenderField} label="نام انگلیسی " validate={required} />
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

            <div className="chapchin width-same">
              {rastes.rasteLoading ? (
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
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  return errors;
};

AddRasteModal = reduxForm({ form: "AddRasteModal", validate })(AddRasteModal);

const mps = ({ rastes, etehadiyes, otaghAsnafs, auth }) => ({ rastes, etehadiyes, otaghAsnafs, auth });

export default connect(
  mps,
  { addRaste, getEtehadiyes, getOtaghAsnafs }
)(AddRasteModal);
