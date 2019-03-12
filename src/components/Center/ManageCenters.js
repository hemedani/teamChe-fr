import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import Select from "react-select";

import DotLoader from "../Utils/DotLoader";
import { getCenters, cleanCenters, getCities, getWareTypes, getRastes, GetCentersCount } from "../../actions";

import Center from "./Center";
import AddCenterModal from "./AddCenterModal";
import EditCenterModal from "./EditCenterModal";
import EditPicCenterModal from "./EditPicCenterModal";
import ChangeCenterPicModal from "./ChangeCenterPicModal";
import AddDoctorModal from "./AddDoctorModal";
import AddAddressModal from "./AddAddressModal";

class ManageCenters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wareTypes: [],
      wareType: [],
      raste: [],
      rastes: [],
      query: {}
    };
  }
  componentWillMount() {
    this.props.cleanCenters();
    this.props.getCenters();
    this.props.getCities();
    this.props.getWareTypes();
    this.props.getRastes();
  }
  cantinueGetCenters() {
    let query = this.state.query;
    if (this.props.centers.centers.length > 0) {
      query.id = this.props.centers.centers[this.props.centers.centers.length - 1]._id;
    }
    this.props.getCenters(query);
  }
  onSubmitForm({ name, address }) {
    let query = this.state.query;
    query.name = name;
    query.address = address;
    delete query.id;
    this.setState({ query });
    this.props.cleanCenters();
    this.props.getCenters(query);
  }

  handleWareTypeSelect(wareTypes) {
    if (wareTypes) {
      let wts = [];
      let query = this.state.query;
      wareTypes.map(wt => wts.push(wt.enName));
      query.wareTypes = wts;
      this.setState({ wareTypes, wareType: wts, query });
    }
  }

  handleRasteSelect(rastes) {
    if (rastes) {
      let cts = [];
      let query = this.state.query;
      rastes.map(ct => cts.push(ct.enName));
      query.rastes = cts;
      this.setState({ rastes, raste: cts, query });
    }
  }
  render() {
    let {
      centers: { centerLoading, centers },
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props;
    return (
      <div className="fasbaghal">
        <div className="grid">
          <h1>مراکز</h1>
          <div className="poshtzamine">
            <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
              <div className="form-item">
                <div className="form-tak triad">
                  <label> نام </label>
                  <Field name="name" component="input" placeholder="نام" />
                </div>
                <div className="form-tak triad">
                  <label> آدرس </label>
                  <Field name="address" component="input" placeholder="آدرس" />
                </div>
                <div className="form-tak triad">
                  <label>شهر </label>
                  <Field name="city" component="select" className="form-field-field">
                    <option />
                    {this.props.cities.cities.map((city, i) => (
                      <option key={i} value={city._id}>
                        {city.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="triad">
                  <Select
                    name="wareType"
                    labelKey="name"
                    valueKey="enName"
                    rtl={true}
                    multi
                    placeholder="یک محصول انتخاب کنید"
                    value={this.state.wareTypes}
                    onChange={this.handleWareTypeSelect.bind(this)}
                    options={this.props.wareTypes.wareTypes}
                  />
                </div>
                <div className="triad">
                  <Select
                    name="raste"
                    labelKey="name"
                    valueKey="enName"
                    rtl={true}
                    multi
                    placeholder="یک فروشگاه انتخاب کنید"
                    value={this.state.rastes}
                    onChange={this.handleRasteSelect.bind(this)}
                    options={this.props.rastes.rastes}
                  />
                </div>
              </div>

              {centerLoading ? (
                <div className="chapchin width-same">
                  <DotLoader height="3rem" width="8rem" />
                </div>
              ) : (
                <div className="chapchin width-same">
                  <button type="submit" disabled={submitting} className="dogme i-round i-sabz">
                    جستجو ...{" "}
                  </button>
                  <Link to="/manage/center/add" className="dogme i-round i-abi">
                    {" "}
                    افزودن مرکز{" "}
                  </Link>
                </div>
              )}
            </form>

            <div className="grid-section end-aligned">
              <span className="count">تعداد مراکز : {this.props.centers.centersCount} </span>
              {this.props.centers.countLoading ? (
                <DotLoader height="2.5rem" width="6rem" />
              ) : (
                <span className="dogme i-sabz i-round" onClick={() => this.props.GetCentersCount()}>
                  دریافت
                </span>
              )}
            </div>

            <div className="grid-section">
              {centers.map((center, i) => (
                <Center key={center._id} {...center} />
              ))}
            </div>
            {!this.props.centers.reachEnd && (
              <div className="chapchin width-same-big">
                <span className="dogme i-round i-abi" onClick={this.cantinueGetCenters.bind(this)}>
                  {" "}
                  ادامه مراکز{" "}
                </span>
              </div>
            )}
            {centerLoading && <DotLoader />}
          </div>
        </div>
        <br />
        <Route path="/manage/center/add" exact component={AddCenterModal} />
        <Route path="/manage/center/edit/:id" exact component={EditCenterModal} />
        <Route path="/manage/center/edit/pic/:id" exact component={EditPicCenterModal} />
        <Route path="/manage/center/changepic/:id" exact component={ChangeCenterPicModal} />
        <Route path="/manage/center/doctor/:id" exact component={AddDoctorModal} />
        <Route path="/manage/center/address/:id" exact component={AddAddressModal} />
      </div>
    );
  }
}

ManageCenters = reduxForm({ form: "ManageCenters" })(ManageCenters);

const mps = ({ centers, cities, wareTypes, rastes }) => ({ centers, cities, wareTypes, rastes });

export default connect(
  mps,
  { getCenters, cleanCenters, getCities, getWareTypes, getRastes, GetCentersCount }
)(ManageCenters);
