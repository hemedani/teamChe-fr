import axios from "axios";
import { change } from "redux-form";
import {
  GET_RASTES,
  GET_RASTES_ERR,
  ADD_RASTE,
  REMOVE_RASTE,
  RASTE_LOAD,
  YOUR_RASTE,
  ADD_RASTE_ERR,
  RASTE_PIC_LOAD,
  RASTE_ADD_PIC,
  UPDATE_RASTE,
  RASTE_UPDATE_LOAD,
  UPDATE_RASTE_ERR,
  RU
} from "./types";

export const getRastes = () => {
  return dispatch => {
    dispatch({ type: RASTE_LOAD });
    return axios
      .get(`${RU}/Rastes`, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: GET_RASTES, payload: resp.data.rastes }))
      .catch(e => dispatch({ type: GET_RASTES_ERR }));
  };
};

export const yourRaste = typeid => {
  return dispatch => {
    dispatch({ type: RASTE_LOAD });
    return axios
      .get(`${RU}/yourRaste`, { params: { typeid }, headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        dispatch({ type: YOUR_RASTE, payload: resp.data.raste });
        return resp.data.type;
      })
      .catch(e => {});
  };
};

export const addRaste = Raste => {
  return dispatch => {
    dispatch({ type: RASTE_LOAD });
    return axios
      .post(`${RU}/Raste/add`, Raste, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: ADD_RASTE, payload: resp.data.raste }))
      .catch(error => dispatch({ type: ADD_RASTE_ERR }));
  };
};

export const updateRaste = Raste => {
  return dispatch => {
    dispatch({ type: RASTE_UPDATE_LOAD });
    return axios
      .post(`${RU}/Raste/update`, Raste, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: UPDATE_RASTE, payload: resp.data.raste });
      })
      .catch(error => dispatch({ type: UPDATE_RASTE_ERR }));
  };
};

export const removeRaste = _id => {
  return dispatch => {
    dispatch({ type: RASTE_LOAD });
    axios
      .post(`${RU}/Raste/remove`, { _id }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: REMOVE_RASTE, payload: _id }))
      .catch(error => {});
  };
};
