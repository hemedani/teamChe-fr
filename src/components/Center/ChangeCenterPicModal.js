import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import Dropzone from "react-dropzone";
import Loader from "../Utils/Loader";
import ProgressBar from "../Utils/ProgressBar";
import { centerUploadPic, cleanPicUpPercent, addPicToCenter, CENTER_UPDATE, RU } from "../../actions";

class ChangeCenterPicModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      err: true,
      peygham: [],
      _id: ""
    };
    this.onDrop = this.onDrop.bind(this);
    this.sendToBack = this.sendToBack.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ _id: this.props.match.params.id });
    }

    this.props.cleanPicUpPercent();
  }

  onDrop(files) {
    this.setState({ files });
    this.props.centerUploadPic({ files });
  }

  sendToBack(v) {
    const { picsUploaded } = this.props.centers;
    const { _id } = this.state;

    if (picsUploaded.length > 0) {
      this.props.addPicToCenter({ _id, picsUploaded }).then(resp => {
        if (resp.type === CENTER_UPDATE) {
          this.props.history.push("/manage/center");
        }
      });
    } else {
      console.log("lotfan yek aks upload konid");
    }
  }

  componentWillUnmount() {
    this.props.cleanPicUpPercent();
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    }

    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <div className="modal-darbar">
        <div className="modal-back" onClick={this.props.history.goBack} />
        <div className="modal">
          <section>
            {!this.props.centers.picLoading && (
              <div className="dropzone">
                <Dropzone onDrop={this.onDrop} className="dropzone-styl">
                  {/* <p>عکس هاتون رو به اینجا بکشید، یا کلیک کنید و اونها رو انتخاب کنید</p> */}
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>عکس هاتون رو به اینجا بکشید، یا کلیک کنید و اونها رو انتخاب کنید</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            )}
            <aside>
              <h2>عکسها</h2>

              <div className="prog-bar" style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-around" }}>
                {this.state.files.map((f, i) => {
                  let percentObj = _.find(this.props.centers.picUpPercent, { i: i }) || {};
                  let percent = 0;
                  if (percentObj.percent) {
                    percent = percentObj.percent;
                  }
                  if (percent === 100) {
                    return null;
                  } else {
                    return <ProgressBar key={i} percent={percent} img={f.preview} pcolor="#e86704" scale="10rem" />;
                  }
                })}
              </div>
              <hr />
              <div className="uploaded-pic-wrapper">
                {this.props.centers.picsUploaded.map(upPic => (
                  <div key={upPic.name}>
                    <div className="image">
                      <img src={`${RU}/pic/orginal/${upPic.name}`} alt="upPic.name" />
                    </div>
                    <span className="pinteb-icon icon-check" />
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <div className="form-item">
            <div className="form-tak taki">
              <label> ای دی </label>
              <input value={this.state._id} disabled />
            </div>
          </div>

          <div className="chapchin width-same">
            <span disabled={this.state.files.length < 1} className="dogme i-round i-abi" onClick={this.sendToBack}>
              ذخیره
            </span>

            <Link to={`/manage/center`} className="dogme i-round i-ghermez">
              بازگشت
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mps = ({ centers }) => ({ centers });

export default connect(
  mps,
  { centerUploadPic, cleanPicUpPercent, addPicToCenter }
)(ChangeCenterPicModal);
