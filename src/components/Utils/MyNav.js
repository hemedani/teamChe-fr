import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import cx from "classnames";
import qs from "query-string";

import { setBackHeader, unsetBackHeader, cleanCenters, toggleMobNav, toggleSearchNav } from "../../actions";
import ManageBtn from "./ManageBtn";
import LoginBtn from "./LoginBtn";
import logo from "../../img/arm-asnaf.png";

class MyNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBc: false,
      name: ""
    };

    this.handleOnScroll = this.handleOnScroll.bind(this);
    this.searchCenters = this.searchCenters.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  handleOnScroll() {
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    if (scrollTop > 150 && !this.props.pinteb.backHeader && !/centers/.test(this.props.location.pathname))
      this.props.setBackHeader();
    if (scrollTop < 150 && this.props.pinteb.backHeader) this.props.unsetBackHeader();
  }
  searchCenters() {
    if (this.state.name) {
      let query = qs.parse(this.props.location.search);
      let { name } = this.state;
      query.name = name;

      if (JSON.stringify(query) !== JSON.stringify(qs.parse(this.props.location.search))) {
        this.props.cleanCenters();
      }

      this.props.history.push({ pathname: "/centers", search: qs.stringify(query) });
    }
  }
  componentWillReceiveProps(np) {
    if (!/centers/.test(np.location.pathname)) {
      this.setState({ name: "" });
    }
  }

  toggleMobileNav() {
    this.props.toggleMobNav();
  }
  toggleSearchNav() {
    this.props.toggleSearchNav();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }
  render() {
    return (
      <div className="tamam-safe">
        <div className="nav-container">
          <div
            className={cx("nav-wrapper", {
              "fixed-some-page": /centers/.test(this.props.location.pathname),
              "hide-nav": this.props.pinteb.backHeader
            })}
          >
            <div className="logo-nav pad-horizen">
              <img src={logo} alt="Hamehdaan Otagh Asnaf Iran" />
              <nav className="nav-left">
                <LoginBtn />
              </nav>
            </div>
            <div className="dar-nav pad-horizen">
              <nav className="nav">
                <NavLink activeClassName="selected" exact className="dogme i-round i-sabz nav-btn" to="/">
                  خانه
                </NavLink>
              </nav>
              <div className="jostjo">
                <div className="inpSearch">
                  <input
                    placeholder="جستجو ..."
                    value={this.state.name}
                    onChange={ev => this.setState({ name: ev.target.value })}
                    onKeyPress={e => {
                      if (e.key === "Enter") this.searchCenters();
                    }}
                  />
                  <i className="pinteb-icon icon-search" onClick={this.searchCenters} />
                </div>
              </div>
            </div>
          </div>

          <div className={cx("fixed-nav", { "enable my-slideInDown my-animated": this.props.pinteb.backHeader })}>
            <section className="nav-wrapper">
              <div className="in-fixed-nav">
                <div className="img-wrapper">
                  <img src={logo} alt="Hamehdaan Otagh Asnaf Iran" />
                </div>
                <nav className="nav">
                  <NavLink activeClassName="selected" exact className="dogme i-round i-sabz nav-btn" to="/">
                    خانه
                  </NavLink>
                </nav>
              </div>
              <div className="in-fixed-nav">
                <div className="jostjo">
                  <div className="inpSearch">
                    <input
                      placeholder="جستجو ..."
                      value={this.state.name}
                      onChange={ev => this.setState({ name: ev.target.value })}
                      onKeyPress={e => {
                        if (e.key === "Enter") this.searchCenters();
                      }}
                    />
                    <i className="pinteb-icon icon-search" onClick={this.searchCenters} />
                  </div>
                </div>
                <nav className="nav-left">
                  <LoginBtn />
                </nav>
              </div>
            </section>
          </div>

          <div className={cx("mobile-nav", { "enable my-slideInDown my-animated": this.props.pinteb.backHeader })}>
            <section className="strip">
              <i className="pinteb-icon icon-navicon" onClick={this.toggleMobileNav.bind(this)} />
              <NavLink activeClassName="selected" className="fixed-nav-btn-top" to="/">
                <img src={logo} alt="Hamehdaan Otagh Asnaf Iran" />
              </NavLink>
              <div className="icon-wrapper">
                <i className="pinteb-icon icon-search" onClick={this.toggleSearchNav.bind(this)} />
              </div>
            </section>

            <section className={cx("search-section", { open: this.props.pinteb.mobSearchOpen })}>
              <div className="jostjo search-in-strip">
                <div className="inpSearch">
                  <input
                    placeholder="جستجو ..."
                    value={this.state.name}
                    onChange={ev => this.setState({ name: ev.target.value })}
                    onKeyPress={e => {
                      if (e.key === "Enter") this.searchCenters();
                    }}
                  />
                  <i className="pinteb-icon icon-search" onClick={this.searchCenters} />
                  <i className="pinteb-icon icon-close" onClick={this.toggleSearchNav.bind(this)} />
                </div>
              </div>
            </section>

            <div id="mySidenav" className={cx("sidenav", { open: this.props.pinteb.mobNavOpen })}>
              <div className="side-nav-back" onClick={this.toggleMobileNav.bind(this)} />
              <div className="side-nav-wrapper">
                <span className="closebtn" onClick={this.toggleMobileNav.bind(this)}>
                  &times;
                </span>

                <div className="sidenav-logo">
                  <img src={logo} alt="Hamehdaan Otagh Asnaf Iran" />
                </div>

                <div className="jostjo search-in-sidenav">
                  <div className="inpSearch">
                    <input
                      placeholder="جستجو ..."
                      value={this.state.name}
                      onChange={ev => this.setState({ name: ev.target.value })}
                      onKeyPress={e => {
                        if (e.key === "Enter") this.searchCenters();
                      }}
                    />
                    <i className="pinteb-icon icon-search" onClick={this.searchCenters} />
                  </div>
                </div>

                <LoginBtn />

                <div className="btns">
                  <NavLink activeClassName="selected" exact className="fixed-nav-btn-top" to="/">
                    خانه
                  </NavLink>
                </div>
                <div className="sidenav-footer">پین‌طب، سلامتی نزدیک توست ...</div>
              </div>
            </div>
          </div>
        </div>

        <ManageBtn />
      </div>
    );
  }
}
const msp = ({ pinteb }) => ({ pinteb });

export default withRouter(
  connect(
    msp,
    { setBackHeader, unsetBackHeader, cleanCenters, toggleMobNav, toggleSearchNav }
  )(MyNav)
);
