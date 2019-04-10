import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import cities from "./city_rc";
import parishes from "./parish_rc";
import centers from "./centers_rc";
import center from "./center_rc";
import wareTypes from "./wareType_rc";
import wares from "./ware_rc";
import wareSliders from "./wareSlider_rc";
import promotions from "./promotion_rc";
import wareOptions from "./wareOption_rc";
import massages from "./massage_rc";
import options from "./option_rc";
import rates from "./rate_rc";
import carts from "./cart_rc";
import purchases from "./purchase_rc";
import authReducer from "./auth_reducer";
import users from "./user_rc";
import pinteb from "./pinteb_rc";
import deliveries from "./delivery_rc";
import states from "./state_rc";
import config from "./config_rc";
import map from "./map_rc";

import rastes from "./raste_rc";
import etehadiyes from "./etehadiye_rc";
import otaghAsnafs from "./otaghAsnaf_rc";
import otaghBazarganis from "./otaghBazargani_rc";

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  toastr: toastrReducer,
  cities,
  parishes,
  centers,
  center,
  deliveries,
  states,
  config,
  wareTypes,
  wares,
  options,
  rates,
  users,
  carts,
  wareSliders,
  promotions,
  wareOptions,
  massages,
  pinteb,
  purchases,
  map,
  rastes,
  etehadiyes,
  otaghAsnafs,
  otaghBazarganis
});

export default rootReducer;
