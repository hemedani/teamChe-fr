import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import {
  getCities,
  getStates,
  getParishes,
  getOtaghAsnafs,
  getOtaghBazarganis,
  addEtehadiye,
  etehadiyeUploadPic,
  ADD_ETEHADIYE
} from "../../actions";
import _ from "lodash";
import Loader from "../Utils/Loader";
import { RenderField, required } from "../Utils/FormField";
import Map from "../Utils/MapBox";
import {
  ParishSelectErr,
  OstanSelectErr,
  CitySelectErr,
  OtaghBazarganiSelectErr,
  OtaghAsnafSelectErr
} from "../../actions/Errors";
import { immutableSplice } from "../Utils/Imutable";
import SelectForm from "../Utils/SelectForm";

class AddEtehadiyeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
      peygham: [],
      picErr: true,
      err: [],
      location: null,
      city: null,
      state: null,
      parish: null,
      otaghBazargani: null,
      otaghAsnaf: null,
      address: {}
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handeStateSelect = this.handeStateSelect.bind(this);
    this.handleSubmitPic = this.handleSubmitPic.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {
    this.props.getStates();
    this.props.getCities();
    this.props.getParishes();
    this.props.getOtaghBazarganis();
    this.props.getOtaghAsnafs();
  }

  onSubmitForm(v) {
    let { parish, err, state, city, address, otaghBazargani, otaghAsnaf } = this.state;
    if (!state) {
      return this.setState({ err: [...err, OstanSelectErr] });
    }
    if (!parish) {
      return this.setState({ err: [...err, ParishSelectErr] });
    }
    if (!city) {
      return this.setState({ err: [...err, CitySelectErr] });
    }
    if (!otaghBazargani) {
      return this.setState({ err: [...err, OtaghBazarganiSelectErr] });
    }
    if (!otaghAsnaf) {
      return this.setState({ err: [...err, OtaghBazarganiSelectErr] });
    }
    this.setState({ err: [] });
    this.props.addEtehadiye({ ...v, state, city, parish, address, otaghBazargani, otaghAsnaf }).then(resp => {
      if (resp.type === ADD_ETEHADIYE) {
        this.props.history.push("/manage/etehadiye");
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

  onDragEnd(e) {
    this.props.dispatch(change("AddEtehadiyeModal", "lat", e.getLatLng().lat));
    this.props.dispatch(change("AddEtehadiyeModal", "lng", e.getLatLng().lng));
  }

  handeStateSelect({ _id, location, name }, stateKey, errStr) {
    let { err } = this.state;
    const index = err.indexOf(errStr);
    const newErr = immutableSplice(err, index, 1);
    if (stateKey === "state") {
      this.props.getCities(_id);
      this.props.getParishes({ stateId: _id });
    }
    if (stateKey === "city") {
      this.props.getParishes({ cityId: _id });
      this.props.getOtaghBazarganis({ cityId: _id });
    }
    if (stateKey === "otaghBazargani") {
      this.props.getOtaghAsnafs({ bargozariId: _id });
    }
    this.setState({ [stateKey]: _id, location, err: newErr, address: { ...this.state.address, [stateKey]: name } });
  }
  returnLabel({ name }) {
    return name;
  }
  returnValue({ _id }) {
    return _id;
  }

  handleSubmitPic(e) {
    e.preventDefault();

    const file = this.state.file;
    this.props.etehadiyeUploadPic({ file });
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

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

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }

    const {
      handleSubmit,
      etehadiyes,
      submitting,
      history,
      cities: { cities },
      states: { states },
      parishes: { parishes },
      otaghBazarganis: { otaghBazarganis },
      otaghAsnafs: { otaghAsnafs }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={history.goBack} />
        <div className="modal">
          <form onSubmit={this.handleSubmitPic}>
            <input type="file" onChange={this.handleImageChange} />

            <div className="chapchin width-same">
              {etehadiyes.picLoading ? (
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
              <Field name="code" component={RenderField} label="کد اتحادیه" type="number" validate={required} />
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
              <SelectForm
                itrator={otaghAsnafs}
                returnLabel={this.returnLabel}
                returnValue={this.returnValue}
                state={this.state.otaghAsnaf}
                handeStateSelect={this.handeStateSelect}
                label="اتاق اصناف"
                stateKey="otaghAsnaf"
                err={OtaghAsnafSelectErr}
              />
            </div>

            {this.renderError()}
            <div className="chapchin width-same">
              <button type="submit" disabled={submitting} className="dogme i-round i-abi">
                ذخیره
              </button>
              <span onClick={history.goBack} className="dogme i-round i-tosi">
                بازگشت
              </span>
            </div>
          </form>
          <br />
          <Map onDragEnd={this.onDragEnd} mySearchBox={true} setPolygon={this.setPolygon} location={this.state.location} />
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  return errors;
};

AddEtehadiyeModal = reduxForm({ form: "AddEtehadiyeModal", validate })(AddEtehadiyeModal);

const mps = ({ etehadiyes, cities, states, parishes, otaghBazarganis, otaghAsnafs }) => ({
  etehadiyes,
  cities,
  states,
  parishes,
  otaghBazarganis,
  otaghAsnafs
});

export default connect(
  mps,
  { addEtehadiye, etehadiyeUploadPic, getCities, getStates, getParishes, getOtaghBazarganis, getOtaghAsnafs }
)(AddEtehadiyeModal);
