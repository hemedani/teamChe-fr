import React, { Component } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import Select from "react-select";
import { getParishes, cleanCenters, ADD_PARISH } from "../../actions";

class ChangeParishModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parish: null
    };
  }
  componentDidMount() {
    this.props.getParishes();
  }
  onSubmit() {
    let query = qs.parse(this.props.location.search);
    let { parish } = this.state;
    query.parish = parish;

    this.props.cleanCenters();
    this.props.history.push({ pathname: "/centers", search: qs.stringify(query) });
  }

  handleParishSelect(parish) {
    parish ? this.setState({ parish: parish.enName }) : this.setState({ parish: null });
  }

  render() {
    const {
      parishes: { parishes }
    } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal-select-box">
          <h1>انتخاب شهر </h1>

          <div className="select">
            <Select
              name="parish"
              labelKey="name"
              valueKey="enName"
              rtl={true}
              placeholder="یک شهر انتخاب کنید"
              value={this.state.parish}
              onChange={this.handleParishSelect.bind(this)}
              options={parishes}
            />
          </div>

          <button className="dogme i-round i-abi temamsafe z-index-0" onClick={this.onSubmit.bind(this)}>
            تغییر شهر
          </button>
        </div>
      </div>
    );
  }
}

const msp = ({ parishes }) => ({ parishes });

export default connect(
  msp,
  { getParishes, cleanCenters }
)(ChangeParishModal);
