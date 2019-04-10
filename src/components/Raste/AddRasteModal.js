import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { addRaste, rasteUploadPic, getEtehadiyes, ADD_RASTE } from "../../actions";
import _ from "lodash";
import Loader from "../Utils/Loader";
import { RenderField, required } from "../Utils/FormField";
import { EtehadiyeSelectErr } from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";
import SelectForm from "../Utils/SelectForm";
class AddRasteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      peygham: [],
      err: [],
      etehadiye: null,
      picErr: true
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.handleSubmitPic = this.handleSubmitPic.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
  }
  componentDidMount() {
    this.props.getEtehadiyes();
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

  handleSubmitPic(e) {
    e.preventDefault();

    console.log("handle uploading-", this.state.file);
    const file = this.state.file;
    this.props.rasteUploadPic({ file });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    console.log("file az _handleImageChange EzafAksKarbar()", file);

    // create an image element with that selected file
    let img = new Image();
    img.src = window.URL.createObjectURL(file);

    let that = this;

    if (file.type !== "image/png") {
      if (_.includes(that.state.peygham, "لطفا یک عکس با فرمت png انتخاب کنید")) {
        that.setState({ picErr: true });
      } else {
        that.setState({ picErr: true, peygham: [...that.state.peygham, "لطفا یک عکس با فرمت png انتخاب کنید"] });
      }
    } else {
      let peygham = _.pull(that.state.peygham, "لطفا یک عکس با فرمت png انتخاب کنید");
      that.setState({ picErr: false, peygham: peygham });
    }
    reader.onloadend = () => {
      this.setState({ file: file, imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(file);
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
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }

    const {
      handleSubmit,
      rastes,
      submitting,
      history,
      etehadiyes: { etehadiyes }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={history.goBack} />
        <div className="modal">
          <form onSubmit={this.handleSubmitPic}>
            <input type="file" onChange={this.handleImageChange} />

            <div className="chapchin width-same">
              {rastes.picLoading ? (
                <div className="vorod-bargozari">
                  <Loader />
                </div>
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

          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              <Field name="pic" component={RenderField} label="تصویر" validate={required} disabled />
              <Field name="picRef" component={RenderField} label="تصویر" validate={required} disabled />
              <Field name="name" component={RenderField} label="نام" validate={required} />
              <Field name="enName" component={RenderField} label="نام انگلیسی " validate={required} />

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
            </div>

            <div className="chapchin width-same">
              <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                ذخیره
              </button>
              <span onClick={history.goBack} className="dogme i-round i-tosi">
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

AddRasteModal = reduxForm({ form: "AddRasteModal", validate })(AddRasteModal);

const mps = ({ rastes, etehadiyes }) => ({ rastes, etehadiyes });

export default connect(
  mps,
  { addRaste, rasteUploadPic, getEtehadiyes }
)(AddRasteModal);
