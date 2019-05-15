import axios from "axios";
import {
  GET_PARISHES,
  ADD_PARISH,
  REMOVE_PARISH,
  PARISH_LOAD,
  YOUR_PARISH,
  ADD_PARISH_ERR,
  SET_PARISH_COORDS,
  RU,
  PARISH_UPDATE_LOAD,
  UPDATE_PARISH,
  UPDATE_PARISH_ERR,
  CLEAN_PARISH
} from "./types";
import { toastr } from "react-redux-toastr";

export const getParishes = params => {
  return dispatch => {
    dispatch({ type: PARISH_LOAD });
    if (!params || !params._id) {
      dispatch({ type: CLEAN_PARISH });
    }
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

export const updateParish = parish => {
  return dispatch => {
    dispatch({ type: PARISH_UPDATE_LOAD });
    return axios
      .post(`${RU}/parish/update`, parish, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        toastr.info("با تشکر", `محله بروزرسانی شد`);
        return dispatch({ type: UPDATE_PARISH, payload: resp.data.parish });
      })
      .catch(err => dispatch({ type: UPDATE_PARISH_ERR, payload: err }));
  };
};

export const setParishCoords = coords => ({ type: SET_PARISH_COORDS, payload: coords });
export const cleanParish = () => ({ type: CLEAN_PARISH });

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
