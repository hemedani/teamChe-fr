import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import MyRoute from "./components/MyRoute";
import ScrollToTop from "./components/Utils/ScrollToTop";

import GA from "../src/components/Utils/GoogleAnalytics";

import "./css/Shabnam/font-face.css";
import "normalize.css";
import "./css/index.css";
import "./css/redux-toastr.css";

// import { setRTLTextPlugin } from 'mapbox-gl';

// setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.2/mapbox-gl-rtl-text.js');

const App = ({ store }) => (
  <Provider store={store}>
    <div className="darbar-rishe">
      <div className="back-img" />
      <Router>
        <ScrollToTop>
          {GA.init() && <GA.RouteTracker />}
          <MyRoute />
        </ScrollToTop>
      </Router>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
      />
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
