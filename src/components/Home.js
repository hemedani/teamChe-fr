import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "./../img/arm-asnaf.png";

const Home = ({ auth }) => (
  <div className="home-wrapper">
    <div className="khane">
      <div className="icon-home-wrapper">
        <img src={logo} alt="Pinteb-The health secret" />
        <div className="home-lead">
          <strong>همه دان </strong>نزدیکترین فروشگاه به شما ...
        </div>
      </div>
      {!auth.authenticated && (
        <div className="home-selec-box">
          <Link to="/login" className="dogme i-round i-sabz-narengi">
            ورود
          </Link>
        </div>
      )}
    </div>
  </div>
);

const msp = ({ auth }) => ({ auth });

export default connect(msp)(Home);
