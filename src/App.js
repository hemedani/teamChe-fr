import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import MyRoute from "./components/MyRoute";
import ScrollToTop from "./components/Utils/ScrollToTop";

import "./css/Shabnam/font-face.css";
import "./css/leaflet.draw.css";
import "normalize.css";
import "./css/redux-toastr.css";
import "./css/index.css";

const App = ({ store }) => (
  <Provider store={store}>
    <div className="darbar-rishe">
      <div className="back-img" />
      <Router>
        <ScrollToTop>
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
