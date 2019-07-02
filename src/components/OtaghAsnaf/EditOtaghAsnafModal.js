import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, reduxForm, change } from "redux-form";
import { updateOtaghAsnaf, UPDATE_OTAGH_ASNAF } from "../../actions";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";
import SelectForm from "../Utils/SelectForm";
import { OstanSelectErr, CitySelectErr, ParishSelectErr, OtaghBazarganiSelectErr } from "../../actions/Errors";

class EditOtaghAsnafModal extends Component {
  onSubmitForm({ _id, name, enName }) {
    this.props.updateOtaghAsnaf({ _id, name, enName }).then(resp => {
      if (resp.type === UPDATE_OTAGH_ASNAF) this.props.history.goBack();
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
    const {
      handleSubmit,
      otaghAsnafs,
      submitting,
      history,
      cities: { cities },
      states: { states },
      parishes: { parishes },
      otaghBazarganis: { otaghBazarganis }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={history.goBack} />
        <div className="modal">
          {/* <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
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
          </form> */}
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              <Field name="name" component={RenderField} label="نام" validate={required} />
              <Field name="enName" component={RenderField} label="نام انگلیسی " validate={required} />
              <Field name="text" component={RenderField} label="آدرس " validate={required} />
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
              <SelectForm
                itrator={parishes}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.parish}
                handeStateSelect={this.handeStateSelect}
                label="محله"
                stateKey="parish"
                err={ParishSelectErr}
              />
              <SelectForm
                itrator={otaghBazarganis}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.otaghBazargani}
                handeStateSelect={this.handeStateSelect}
                label="اتاق بازرگانی"
                stateKey="otaghBazargani"
                err={OtaghBazarganiSelectErr}
              />
            </div>
            {this.renderError()}
            <div className="chapchin width-same">
              {otaghAsnafs.otaghAsnafLoading ? (
                <DotLoader height="3rem" width="8rem" />
              ) : (
                <div className="center-flex">
                  <button type="submit" disabled={submitting} className="dogme i-round i-sabz">
                    ذخیره
                  </button>
                  <span onClick={history.goBack} className="dogme i-round i-tosi">
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

EditOtaghAsnafModal = reduxForm({
  form: "EditOtaghAsnafModal",
  validate
})(EditOtaghAsnafModal);

const mps = ({ cities, states, parishes, otaghAsnafs, otaghBazarganis }, props) => {
  let otaghAsnaf = _.find(otaghAsnafs.otaghAsnafs, cnt => cnt._id === props.match.params.id);
  return { initialValues: otaghAsnaf, cities, states, parishes, otaghAsnafs, otaghBazarganis };
};

export default connect(
  mps,
  { updateOtaghAsnaf }
)(EditOtaghAsnafModal);
