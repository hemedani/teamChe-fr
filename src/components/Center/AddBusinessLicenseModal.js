import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import { licensePicUpload, addBusinessLicense, getEditedCenter, CENTER_UPDATE, GET_EDITED_CENTER, RU } from "../../actions";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required } from "../Utils/FormField";
import { Field, reduxForm, initialize } from "redux-form";
import DatePicker from "react-datepicker2";
import moment from "moment-jalaali";
import { IssueDateErr, ExpirationDateErr, MembershipFeeDateErr, OwnerBirthDateErr } from "../../actions/Errors";
import ScrollLock from "react-scrolllock/dist/ScrollLock";

class AddBusinessLicenseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peygham: [],
      err: [],
      issueDate: null,
      expirationDate: null,
      membershipFeeDate: null,
      ownerBirthDate: null,
      imagePreviewUrl: null
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmitPic = this.handleSubmitPic.bind(this);

    this.renderServerError = this.renderServerError.bind(this);
    this.renderServerError = this.renderServerError.bind(this);
  }

  componentDidMount() {
    this.props.getEditedCenter(this.props.match.params.id).then(resp => {
      if (resp.type === GET_EDITED_CENTER) {
        this.props.dispatch(initialize("AddBusinessLicenseModal", this.props.center.editedCenter));
        const {
          issueDate = null,
          expirationDate = null,
          licensePic = null,
          membershipFeeDate = null,
          ownerBirthDate = null
        } = this.props.center.editedCenter;

        this.setState({
          issueDate: issueDate ? moment(issueDate) : null,
          expirationDate: expirationDate ? moment(expirationDate) : null,
          membershipFeeDate: membershipFeeDate ? moment(membershipFeeDate) : null,
          ownerBirthDate: ownerBirthDate ? moment(ownerBirthDate) : null,
          imagePreviewUrl: licensePic ? `${RU}/pic/500/${licensePic}` : null
        });
      }
    });
  }

  handleSubmitPic(e) {
    e.preventDefault();

    const file = this.state.file;
    this.props.licensePicUpload({ file });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    // create an image element with that selected file
    let img = new Image();
    img.src = window.URL.createObjectURL(file);

    let that = this;

    if (file.type !== "image/jpeg") {
      if (_.includes(that.state.peygham, "لطفا یک عکس با فرمت jpeg انتخاب کنید")) {
        that.setState({ picErr: true });
      } else {
        that.setState({ picErr: true, peygham: [...that.state.peygham, "لطفا یک عکس با فرمت jpeg انتخاب کنید"] });
      }
    } else {
      let peygham = _.pull(that.state.peygham, "لطفا یک عکس با فرمت jpeg انتخاب کنید");
      that.setState({ picErr: false, peygham: peygham });
    }
    reader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(file);
  }

  onSubmitForm(v) {
    let { issueDate, expirationDate, membershipFeeDate, ownerBirthDate, err } = this.state;
    if (!issueDate) {
      return this.setState({ err: [...err, IssueDateErr] });
    }
    if (!expirationDate) {
      return this.setState({ err: [...err, ExpirationDateErr] });
    }
    // if (!membershipFeeDate) {
    //   return this.setState({ err: [...err, MembershipFeeDateErr] });
    // }
    // if (!ownerBirthDate) {
    //   return this.setState({ err: [...err, OwnerBirthDateErr] });
    // }

    this.setState({ err: [] });
    this.props.addBusinessLicense({ ...v, issueDate, expirationDate, membershipFeeDate, ownerBirthDate }).then(resp => {
      if (resp.type === CENTER_UPDATE) {
        this.props.history.goBack();
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

  renderServerError() {
    const { error } = this.props.centers;
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }
    const { handleSubmit, submitting, center } = this.props;
    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <form onSubmit={this.handleSubmitPic}>
            <input type="file" onChange={this.handleImageChange} />

            <div className="chapchin width-same">
              {center.licensePicUpload ? (
                <DotLoader />
              ) : (
                <button
                  type="submit"
                  className="dogme i-round i-abi"
                  disabled={this.state.picErr}
                  onClick={this.handleSubmitPic}
                >
                  بارگزاری عکس
                </button>
              )}
            </div>

            {this.state.peygham.map((pey, i) => (
              <div className="ekhtar" key={i}>
                {pey}
              </div>
            ))}
          </form>

          <div className="ghab-aks-darbar">
            <div className="ghab-aks">{$imagePreview}</div>
          </div>

          <form onSubmit={handleSubmit(this.onSubmitForm)}>
            <div className="form-item">
              <Field name="_id" component={RenderField} label="آی دی" validate={required} disabled />
              <Field name="licensePic" component={RenderField} label="تصویر" disabled />
              <Field name="licensePicRef" component={RenderField} label="تصویر" disabled />
              <Field name="guildId" component={RenderField} label="شناسه صنفی" validate={required} disabled />
              <Field name="personType" component={RenderField} label="نوع شخص" validate={required} />
              <Field name="activityType" component={RenderField} label="نوع فعالیت" validate={required} />
              <Field name="isicCode" component={RenderField} label="کد آیسیک" type="number" validate={required} />
              <Field name="postalCode" component={RenderField} label="کد پستی" type="number" validate={required} />

              <Field name="guildOwnerName" component={RenderField} label="نام صاحب پروانه" />
              <Field name="guildOwnerFamily" component={RenderField} label="نام خانوادگی صاحب پروانه" />
              <Field name="nationalCode" component={RenderField} label="کد ملی صاحب پروانه" type="number" />
              <Field name="identificationCode" component={RenderField} label="شماره شناسنامه صاحب پروانه" type="number" />
              <Field name="guildOwnerPhoneNumber" component={RenderField} label="شماره موبایل صاحب پروانه" type="number" />
              <Field name="ownerFatherName" component={RenderField} label="نام پدر صاحب پروانه" />
            </div>
            <div className="form-item">
              <Field name="steward" component={RenderField} type="checkbox" label="مباشر" wrapper="quintuplet checkbox" />
            </div>

            <div className="form-item">
              <div className="form-tak">
                <label>تاریخ صدور</label>
                <DatePicker
                  isGregorian={false}
                  onChange={issueDate => this.setState({ issueDate })}
                  value={this.state.issueDate}
                />
              </div>
              <div className="form-tak">
                <label>تاریخ انقضاء</label>
                <DatePicker
                  isGregorian={false}
                  onChange={expirationDate => this.setState({ expirationDate })}
                  value={this.state.expirationDate}
                />
              </div>
              <div className="form-tak">
                <label>تاریخ پرداخت حق عضویت</label>
                <DatePicker
                  isGregorian={false}
                  onChange={membershipFeeDate => this.setState({ membershipFeeDate })}
                  value={this.state.membershipFeeDate}
                />
              </div>

              <div className="form-tak">
                <label>تاریخ تولد صاحب پروانه</label>
                <DatePicker
                  isGregorian={false}
                  onChange={ownerBirthDate => this.setState({ ownerBirthDate })}
                  value={this.state.ownerBirthDate}
                />
              </div>
            </div>

            <div className="form-item">
              <Field name="waterPlaque" component={RenderField} label="پلاک آبی" type="number" />
              <Field name="registrationPlaque" component={RenderField} label="پلاک ثبتی" type="number" />
            </div>

            {this.renderError()}
            {this.renderServerError()}

            {this.props.center.centerLoading ? (
              <DotLoader height="3rem" width="8rem" />
            ) : (
              <div className="center-flex">
                <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                  ذخیره
                </button>

                <Link to={`/manage/center`} className="dogme i-round i-ghermez">
                  بازگشت
                </Link>
              </div>
            )}
          </form>
        </div>
        <ScrollLock />
      </div>
    );
  }
}

AddBusinessLicenseModal = reduxForm({ form: "AddBusinessLicenseModal" })(AddBusinessLicenseModal);

const msp = ({ center, centers }) => ({ center, centers });
export default connect(
  msp,
  { licensePicUpload, addBusinessLicense, getEditedCenter }
)(AddBusinessLicenseModal);
