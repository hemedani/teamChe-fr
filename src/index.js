import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import App from "./App";
import thunk from "redux-thunk";
import reducer from "./reducers";
import registerServiceWorker from "./registerServiceWorker";
import {
  AUTH_USER,
  DECREASE_MSG_TIMER,
  STOP_MSG_TIMER,
  DECREASE_AUTH_TIMER,
  STOP_AUTH_TIMER,
  ACCEPT_PHONE
} from "./actions/types";

// let store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(thunk)
// );

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;
if (process.env.NODE_ENV === "production") {
  store = createStore(reducer, compose(applyMiddleware(thunk)));
} else {
  store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
}
// let store = createStore(reducer, applyMiddleware(thunk));

let token = localStorage.getItem("token");

if (token) {
  let user = JSON.parse(localStorage.getItem("user"));
  store.dispatch({ type: AUTH_USER, payload: { user } });
}

let abilityInterval = null;
let storeTimer = parseInt(localStorage.getItem("storeMsgTimer"));
const handleMsgTimer = () => {
  storeTimer = --storeTimer || 0;
  if (storeTimer >= 1) {
    localStorage.setItem("storeMsgTimer", storeTimer);
    store.dispatch({ type: DECREASE_MSG_TIMER, payload: storeTimer });
  } else {
    localStorage.setItem("storeMsgTimer", null);
    clearInterval(abilityInterval);
    store.dispatch({ type: STOP_MSG_TIMER });
  }
};
if (storeTimer) {
  abilityInterval = setInterval(() => handleMsgTimer(), 1000);
}

let authInterval = null;
let authTimer = parseInt(localStorage.getItem("acceptCodeTimer"));
const handleAuthTimer = () => {
  authTimer = --authTimer || 0;
  if (authTimer >= 1) {
    localStorage.setItem("acceptCodeTimer", authTimer);
    store.dispatch({ type: DECREASE_AUTH_TIMER, payload: authTimer });
    store.dispatch({ type: ACCEPT_PHONE, payload: JSON.parse(localStorage.getItem("user")) });
  } else {
    localStorage.setItem("acceptCodeTimer", null);
    clearInterval(authInterval);
    store.dispatch({ type: STOP_AUTH_TIMER });
  }
};
if (storeTimer) {
  authInterval = setInterval(() => handleAuthTimer(), 1000);
}

ReactDOM.render(<App store={store} />, document.getElementById("root"));
registerServiceWorker();
