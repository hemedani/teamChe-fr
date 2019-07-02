import axios from "axios";
import { change } from "redux-form";
import {
  GET_ETEHADIYES,
  GET_ETEHADIYES_ERR,
  ADD_ETEHADIYE,
  REMOVE_ETEHADIYE,
  ETEHADIYE_LOAD,
  ADD_ETEHADIYE_ERR,
  ETEHADIYE_PIC_LOAD,
  ETEHADIYE_ADD_PIC,
  UPDATE_ETEHADIYE,
  ETEHADIYE_UPDATE_LOAD,
  UPDATE_ETEHADIYE_ERR,
  RU
} from "./types";
import { toastr } from "react-redux-toastr";

export const getEtehadiyes = () => {
  return dispatch => {
    dispatch({ type: ETEHADIYE_LOAD });
    return axios
      .get(`${RU}/Etehadiyes`, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: GET_ETEHADIYES, payload: resp.data.etehadiyes }))
      .catch(e => dispatch({ type: GET_ETEHADIYES_ERR }));
  };
};

export const addEtehadiye = Etehadiye => {
  return dispatch => {
    dispatch({ type: ETEHADIYE_LOAD });
    return axios
      .post(`${RU}/etehadiye/add`, Etehadiye, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: ADD_ETEHADIYE, payload: resp.data.etehadiye }))
      .catch(e => {
        console.log("==================");
        console.log("error", JSON.stringify(e, null, 2));
        console.log("==================");
        return dispatch({ type: ADD_ETEHADIYE_ERR });
      });
  };
};

export const updateEtehadiye = Etehadiye => {
  return dispatch => {
    dispatch({ type: ETEHADIYE_UPDATE_LOAD });
    return axios
      .post(`${RU}/etehadiye/update`, Etehadiye, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: UPDATE_ETEHADIYE, payload: resp.data.etehadiye }))
      .catch(error => dispatch({ type: UPDATE_ETEHADIYE_ERR, error }));
  };
};

export const removeEtehadiye = _id => {
  return dispatch => {
    dispatch({ type: ETEHADIYE_LOAD });
    return axios
      .post(`${RU}/etehadiye/remove`, { _id }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: REMOVE_ETEHADIYE, payload: _id }))
      .catch(error => {});
  };
};

export const addOfficerToEtehadiyeAct = query => {
  return dispatch => {
    dispatch({ type: ETEHADIYE_LOAD });
    return axios
      .post(`${RU}/etehadiye/add/officer`, query, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        if (resp.data.updatedEts && resp.data.updatedEts.length > 0) {
          resp.data.updatedEts.map(upEt => dispatch({ type: UPDATE_ETEHADIYE, payload: upEt }));
        }
        return dispatch({ type: UPDATE_ETEHADIYE, payload: resp.data.etehadiye });
      })
      .catch(err => dispatch({ type: UPDATE_ETEHADIYE_ERR, payload: err }));
  };
};

export const etehadiyeUploadPic = ({ file }) => {
  return dispatch => {
    dispatch({ type: ETEHADIYE_PIC_LOAD });
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
        dispatch(change("AddEtehadiyeModal", "picRef", resp.data._id));
        dispatch(change("AddEtehadiyeModal", "pic", resp.data.name));
        return dispatch({ type: ETEHADIYE_ADD_PIC, payload: resp.data });
      })
      .catch(error => {});
  };
};

export const etehadiyeChangePic = ({ file, _id }) => {
  return dispatch => {
    dispatch({ type: ETEHADIYE_PIC_LOAD });
    let data = new FormData();
    data.append("file", file);
    data.append("_id", _id);
    let config = {
      onUploadProgress: progressEvent => {
        let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      },
      headers: { sabti: localStorage.getItem("token") }
    };
    return axios
      .put(`${RU}/etehadiye/change/pic`, data, config)
      .then(resp => {
        toastr.success("با تشکر", `${resp.data.nCModified} صنف هم تصویر اتحادیه آن بروز شد`);
        return dispatch({ type: UPDATE_ETEHADIYE, payload: resp.data.etehadiye });
      })
      .catch(err => dispatch({ type: UPDATE_ETEHADIYE_ERR, payload: err }));
  };
};
