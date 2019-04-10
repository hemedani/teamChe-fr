import axios from "axios";
import {
  GET_PARISHES,
  ADD_PARISH,
  REMOVE_PARISH,
  PARISH_LOAD,
  YOUR_PARISH,
  ADD_PARISH_ERR,
  SET_PARISH_COORDS,
  RU
} from "./types";

export const getParishes = params => {
  return dispatch => {
    dispatch({ type: PARISH_LOAD });
    return axios
      .get(`${RU}/parishes`, {
        params,
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => dispatch({ type: GET_PARISHES, payload: resp.data.parishes }))
      .catch(e => {
        // dispatch( { type: SHAHR_ERR } )
      });
  };
};

export const yourParish = parishid => {
  return dispatch => {
    dispatch({ type: PARISH_LOAD });
    return axios
      .get(`${RU}/yourparish`, {
        params: { parishid },
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => dispatch({ type: YOUR_PARISH, payload: resp.data.parish }))
      .catch(e => {
        // dispatch( { type: TAXIBS_ERR } )
      });
  };
};

export const setParishCoords = coords => ({ type: SET_PARISH_COORDS, payload: coords });

export const addParish = parish => {
  return dispatch => {
    dispatch({ type: PARISH_LOAD });
    return axios
      .post(`${RU}/parish/add`, parish, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: ADD_PARISH, payload: resp.data.parish }))
      .catch(error => dispatch({ type: ADD_PARISH_ERR }));
  };
};

export const removeParish = _id => {
  return dispatch => {
    dispatch({ type: PARISH_LOAD });
    return axios
      .post(`${RU}/parish/remove`, { _id }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: REMOVE_PARISH, payload: _id }))
      .catch(error => {
        // dispatch( { type: SHAHR_ERR } );
      });
  };
};
