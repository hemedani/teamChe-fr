import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { AddOperatorToOtaghAnsafAct, UPDATE_OTAGH_ASNAF, getUsers, RU } from "../../actions";
import { RenderField, required } from "../Utils/FormField";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";

class AddOperatorToOtaghAnsaf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }
  async componentDidMount() {
    const operator = await this.props.getUsers({ level: ["organic.operatorAs"] });
    if (this.props.initialValues.operators) {
      const users = _.filter(operator.payload, v => _.includes(this.props.initialValues.operators, v._id));
      this.setState({ users });
    }
  }
  onSubmitForm({ _id }) {
    const { users } = this.state;
    this.props.AddOperatorToOtaghAnsafAct({ _id, users }).then(resp => {
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
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <form onSubmit={handleSubmit(this.onSubmitForm)}>
            <div className="form-item">
              <Field name="_id" component={RenderField} label="آی دی اتاق اصناف" disabled />
              <Field name="name" component={RenderField} label="نام اتاق اصناف" disabled />
            </div>
            <hr />

            <div className="selec-box-wrapper minimal-select">
              <div className="lead-selec-box">
                <span>اپراتورها</span>
              </div>
              {this.props.users.users.map(user => (
                <div
                  className={cx("select-box minimal", { "active-select-box": _.some(this.state.users, user) })}
                  key={user._id}
                  onClick={() => {
                    let { users } = this.state;
                    users = _.xorBy(users, [user], "_id");
                    this.setState({ users });
                  }}
                >
                  {user.pic ? (
                    <img src={`${RU}/pic/orginal/${user.pic}`} className="pinteb-icon-img" />
                  ) : (
                    <span className="pinteb-icon icon-atari" />
                  )}
                  <div>{user.name}</div>
                </div>
              ))}
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

AddOperatorToOtaghAnsaf = reduxForm({
  form: "AddOperatorToOtaghAnsaf",
  validate
})(AddOperatorToOtaghAnsaf);

const msp = ({ otaghAsnafs, users }, props) => {
  const otaghAsnaf = _.find(otaghAsnafs.otaghAsnafs, cnt => cnt._id === props.match.params.id);
  return { initialValues: otaghAsnaf, users };
};

export default connect(
  msp,
  { AddOperatorToOtaghAnsafAct, getUsers }
)(AddOperatorToOtaghAnsaf);
