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
      .then(resp => dispatch({ type: GET_RASTES, payload: resp.data.Rastes }))
      .catch(e => dispatch({ type: GET_RASTES_ERR }));
  };
};

export const yourRaste = typeid => {
  return dispatch => {
    dispatch({ type: RASTE_LOAD });
    return axios
      .get(`${RU}/yourRaste`, { params: { typeid }, headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        dispatch({ type: YOUR_RASTE, payload: resp.data.Raste });
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
      .then(resp => dispatch({ type: ADD_RASTE, payload: resp.data.Raste }))
      .catch(error => dispatch({ type: ADD_RASTE_ERR }));
  };
};

export const updateRaste = Raste => {
  return dispatch => {
    dispatch({ type: RASTE_UPDATE_LOAD });
    return axios
      .post(`${RU}/Raste/update`, Raste, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: UPDATE_RASTE, payload: resp.data.Raste });
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

export const rasteUploadPic = ({ file }) => {
  return dispatch => {
    dispatch({ type: RASTE_PIC_LOAD });
    let data = new FormData();
    data.append("file", file);
    let config = {
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
      headers: { sabti: localStorage.getItem("token") }
    };
    return axios
      .put(`${RU}/upload`, data, config)
      .then(resp => {
        dispatch(change("AddRasteModal", "picRef", resp.data._id));
        dispatch(change("AddRasteModal", "pic", resp.data.name));
        return dispatch({ type: RASTE_ADD_PIC, payload: resp.data });
      })
      .catch(error => {});
  };
};

export const rasteChangePic = ({ file, id }) => {
  return dispatch => {
    dispatch({ type: RASTE_PIC_LOAD });
    let data = new FormData();
    data.append("file", file);
    data.append("id", id);
    let config = {
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
      headers: { sabti: localStorage.getItem("token") }
    };
    return axios
      .put(`${RU}/change/raste/pic`, data, config)
      .then(resp => dispatch({ type: UPDATE_RASTE, payload: resp.data.Raste }))
      .catch(error => dispatch({ type: UPDATE_RASTE_ERR }));
  };
};
