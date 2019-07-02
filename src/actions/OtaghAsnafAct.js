import axios from "axios";
import { change } from "redux-form";
import {
  GET_OTAGH_ASNAFS,
  GET_OTAGH_ASNAFS_ERR,
  ADD_OTAGH_ASNAF,
  REMOVE_OTAGH_ASNAF,
  OTAGH_ASNAF_LOAD,
  YOUR_OTAGH_ASNAF,
  ADD_OTAGH_ASNAF_ERR,
  OTAGH_ASNAF_PIC_LOAD,
  OTAGH_ASNAF_ADD_PIC,
  UPDATE_OTAGH_ASNAF,
  OTAGH_ASNAF_UPDATE_LOAD,
  UPDATE_OTAGH_ASNAF_ERR,
  RU,
  GET_SELECTED_OTAGH_ASNAF_LOAD,
  GET_SELECTED_OTAGH_ASNAF,
  GET_SELECTED_OTAGH_ASNAF_ERR
} from "./types";

export const getOtaghAsnafs = () => {
  return dispatch => {
    dispatch({ type: OTAGH_ASNAF_LOAD });
    return axios
      .get(`${RU}/OtaghAsnafs`, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: GET_OTAGH_ASNAFS, payload: resp.data.OtaghAsnafs }))
      .catch(e => dispatch({ type: GET_OTAGH_ASNAFS_ERR }));
  };
};

export const yourOtaghAsnaf = typeid => {
  return dispatch => {
    dispatch({ type: OTAGH_ASNAF_LOAD });
    return axios
      .get(`${RU}/get/otagh/asnaf`, { params: { typeid }, headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        dispatch({ type: YOUR_OTAGH_ASNAF, payload: resp.data.OtaghAsnaf });
        return resp.data.type;
      })
      .catch(e => {});
  };
};

export const getOtaghAsnaf = _id => {
  return dispatch => {
    dispatch({ type: GET_SELECTED_OTAGH_ASNAF_LOAD });
    return axios
      .get(`${RU}/get/otagh/asnaf`, { params: { _id } })
      .then(resp => dispatch({ type: GET_SELECTED_OTAGH_ASNAF, payload: resp.data.otaghAsnaf }))
      .catch(err => dispatch({ type: GET_SELECTED_OTAGH_ASNAF_ERR, payload: err }));
  };
};

export const addOtaghAsnaf = OtaghAsnaf => {
  return dispatch => {
    dispatch({ type: OTAGH_ASNAF_LOAD });
    return axios
      .post(`${RU}/OtaghAsnaf/add`, OtaghAsnaf, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: ADD_OTAGH_ASNAF, payload: resp.data.OtaghAsnaf }))
      .catch(error => dispatch({ type: ADD_OTAGH_ASNAF_ERR }));
  };
};

export const updateOtaghAsnaf = OtaghAsnaf => {
  return dispatch => {
    dispatch({ type: OTAGH_ASNAF_UPDATE_LOAD });
    return axios
      .post(`${RU}/OtaghAsnaf/update`, OtaghAsnaf, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: UPDATE_OTAGH_ASNAF, payload: resp.data.OtaghAsnaf });
      })
      .catch(error => dispatch({ type: UPDATE_OTAGH_ASNAF_ERR }));
  };
};

export const AddOperatorToOtaghAnsafAct = query => {
  return dispatch => {
    dispatch({ type: OTAGH_ASNAF_LOAD });
    return axios
      .post(`${RU}/otaghAsnaf/add/operator`, query, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        if (resp.data.updatedAses && resp.data.updatedAses.length > 0) {
          resp.data.updatedAses.map(upAses => dispatch({ type: UPDATE_OTAGH_ASNAF, payload: upAses }));
        }
        return dispatch({ type: UPDATE_OTAGH_ASNAF, payload: resp.data.otaghAsnaf });
      })
      .catch(err => dispatch({ type: UPDATE_OTAGH_ASNAF_ERR, payload: err }));
  };
};

export const removeOtaghAsnaf = _id => {
  return dispatch => {
    dispatch({ type: OTAGH_ASNAF_LOAD });
    axios
      .post(`${RU}/OtaghAsnaf/remove`, { _id }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: REMOVE_OTAGH_ASNAF, payload: _id }))
      .catch(error => {});
  };
};

export const otaghAsnafUploadPic = ({ file }) => {
  return dispatch => {
    dispatch({ type: OTAGH_ASNAF_PIC_LOAD });
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
        dispatch(change("AddOtaghAsnafModal", "picRef", resp.data._id));
        dispatch(change("AddOtaghAsnafModal", "pic", resp.data.name));
        return dispatch({ type: OTAGH_ASNAF_ADD_PIC, payload: resp.data });
      })
      .catch(error => {});
  };
};

export const otaghAsnafChangePic = ({ file, id }) => {
  return dispatch => {
    dispatch({ type: OTAGH_ASNAF_PIC_LOAD });
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
      .put(`${RU}/change/otaghAsnaf/pic`, data, config)
      .then(resp => dispatch({ type: UPDATE_OTAGH_ASNAF, payload: resp.data.OtaghAsnaf }))
      .catch(error => dispatch({ type: UPDATE_OTAGH_ASNAF_ERR }));
  };
};
