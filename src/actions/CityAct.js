import axios from "axios";
import { GET_CITIES, ADD_CITY, REMOVE_CITY, CITY_LOAD, YOUR_CITY, ADD_CITY_ERR, SET_CITY_COORDS, RU } from "./types";

export const getCities = state => {
  return function(dispatch) {
    dispatch({ type: CITY_LOAD });
    return axios
      .get(`${RU}/cities`, {
        params: { state },
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => {
        return dispatch({ type: GET_CITIES, payload: resp.data.cities });
      })
      .catch(e => {
        // dispatch( { type: SHAHR_ERR } )
      });
  };
};

export const yourCity = cityid => {
  return dispatch => {
    dispatch({ type: CITY_LOAD });
    return axios
      .get(`${RU}/yourcity`, {
        params: { cityid },
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => {
        return dispatch({ type: YOUR_CITY, payload: resp.data.city });
      })
      .catch(e => {
        // dispatch( { type: TAXIBS_ERR } )
      });
  };
};

export const setCityCoords = coords => ({ type: SET_CITY_COORDS, payload: coords });

export const addCity = city => {
  return dispatch => {
    dispatch({ type: CITY_LOAD });
    return axios
      .post(`${RU}/city/add`, city, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: ADD_CITY, payload: resp.data.city }))
      .catch(error => dispatch({ type: ADD_CITY_ERR }));
  };
};

export function removeCity(_id) {
  return function(dispatch) {
    dispatch({ type: CITY_LOAD });
    return axios
      .post(`${RU}/city/remove`, { _id }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: REMOVE_CITY, payload: _id });
      })
      .catch(error => {
        // dispatch( { type: SHAHR_ERR } );
      });
  };
}
