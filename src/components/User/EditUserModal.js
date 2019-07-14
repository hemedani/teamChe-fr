import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import { updateUser, UPDATE_USER } from "../../actions";
import cx from "classnames";
import DotLoader from "../Utils/DotLoader";
import { RenderField, required, email, number } from "../Utils/FormField";

const levels = [
  "normal",
  "expert",
  "owner",
  "editor",
  "author",
  "tarah",
  "admin",
  "storekeeper",
  "delivery",
  "organic.veep",
  "organic.administrationManager",
  "organic.publicRelations",
  "organic.support",
  "organic.directorAdministration",
  "organic.unitManagerPlumbing",
  "organic.unionAffairs",
  "organic.inspector",
  "organic.commissionAffairs",
  "organic.secretariat",
  "organic.accountant",

  "organic.operatorEt",
  "organic.bossEt",
  "organic.officerEt",

  "organic.operatorAs",
  "organic.bossAs",
  "organic.officerAs"
];

class EditUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levels: []
    };
  }

  componentDidMount() {
    this.setState({ levels: this.props.initialValues.level });
  }

  onSubmitForm(v) {
    const level = this.state.levels;
    this.props.updateUser({ ...v, level }).then(resp => {
      if (resp.type === UPDATE_USER) this.props.history.goBack();
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
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <form onSubmit={handleSubmit(this.onSubmitForm.bind(this))}>
            <div className="form-item">
              <Field name="_id" component={RenderField} label=" آی دی" validate={required} disabled />
              <Field name="email" component={RenderField} label=" ایمیل" validate={[required, email]} />
              <Field name="name" component={RenderField} label=" نام" validate={required} />
              <Field name="familyName" component={RenderField} label=" نام خانوادگی" validate={required} />
              <Field name="phone" component={RenderField} label=" تلفن" validate={[required, number]} disabled />

              <div className="selec-box-wrapper minimal-select">
                <div className="lead-selec-box">
                  <span>سطح دسترسی</span>
                </div>
                {levels.map((level, i) => (
                  <div
                    className={cx("select-box minimal", { "active-select-box": _.includes(this.state.levels, level) })}
                    key={i}
                    onClick={() => {
                      let { levels } = this.state;
                      levels = _.xor(levels, [level]);

                      this.setState({ levels });
                    }}
                  >
                    <div>{level}</div>
                  </div>
                ))}
              </div>
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

EditUserModal = reduxForm({
  form: "EditUserModal",
  validate
})(EditUserModal);

const mps = ({ users }, props) => {
  let user = _.find(users.users, usr => usr._id === props.match.params.id);
  return { initialValues: user };
};

export default connect(
  mps,
  { updateUser }
)(EditUserModal);
