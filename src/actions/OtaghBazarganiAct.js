import axios from "axios";
import { change } from "redux-form";
import {
  GET_OTAGH_BAZARGANIS,
  GET_OTAGH_BAZARGANIS_ERR,
  ADD_OTAGH_BAZARGANI,
  REMOVE_OTAGH_BAZARGANI,
  OTAGH_BAZARGANI_LOAD,
  YOUR_OTAGH_BAZARGANI,
  ADD_OTAGH_BAZARGANI_ERR,
  OTAGH_BAZARGANI_PIC_LOAD,
  OTAGH_BAZARGANI_ADD_PIC,
  UPDATE_OTAGH_BAZARGANI,
  OTAGH_BAZARGANI_UPDATE_LOAD,
  UPDATE_OTAGH_BAZARGANI_ERR,
  RU
} from "./types";

export const getOtaghBazarganis = () => {
  return dispatch => {
    dispatch({ type: OTAGH_BAZARGANI_LOAD });
    return axios
      .get(`${RU}/OtaghBazarganis`, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: GET_OTAGH_BAZARGANIS, payload: resp.data.OtaghBazarganis }))
      .catch(e => dispatch({ type: GET_OTAGH_BAZARGANIS_ERR }));
  };
};

export const yourOtaghBazargani = typeid => {
  return dispatch => {
    dispatch({ type: OTAGH_BAZARGANI_LOAD });
    return axios
      .get(`${RU}/yourOtaghBazargani`, { params: { typeid }, headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        dispatch({ type: YOUR_OTAGH_BAZARGANI, payload: resp.data.OtaghBazargani });
        return resp.data.type;
      })
      .catch(e => {});
  };
};

export const addOtaghBazargani = OtaghBazargani => {
  return dispatch => {
    dispatch({ type: OTAGH_BAZARGANI_LOAD });
    return axios
      .post(`${RU}/OtaghBazargani/add`, OtaghBazargani, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: ADD_OTAGH_BAZARGANI, payload: resp.data.OtaghBazargani }))
      .catch(error => dispatch({ type: ADD_OTAGH_BAZARGANI_ERR }));
  };
};

export const updateOtaghBazargani = OtaghBazargani => {
  return dispatch => {
    dispatch({ type: OTAGH_BAZARGANI_UPDATE_LOAD });
    return axios
      .post(`${RU}/OtaghBazargani/update`, OtaghBazargani, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: UPDATE_OTAGH_BAZARGANI, payload: resp.data.OtaghBazargani });
      })
      .catch(error => dispatch({ type: UPDATE_OTAGH_BAZARGANI_ERR }));
  };
};

export const removeOtaghBazargani = _id => {
  return dispatch => {
    dispatch({ type: OTAGH_BAZARGANI_LOAD });
    axios
      .post(`${RU}/OtaghBazargani/remove`, { _id }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: REMOVE_OTAGH_BAZARGANI, payload: _id }))
      .catch(error => {});
  };
};

export const otaghBazarganiUploadPic = ({ file }) => {
  return dispatch => {
    dispatch({ type: OTAGH_BAZARGANI_PIC_LOAD });
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
        dispatch(change("AddOtaghBazarganiModal", "picRef", resp.data._id));
        dispatch(change("AddOtaghBazarganiModal", "pic", resp.data.name));
        return dispatch({ type: OTAGH_BAZARGANI_ADD_PIC, payload: resp.data });
      })
      .catch(error => {});
  };
};

export const otaghBazarganiChangePic = ({ file, id }) => {
  return dispatch => {
    dispatch({ type: OTAGH_BAZARGANI_PIC_LOAD });
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
      .put(`${RU}/change/otaghBazargani/pic`, data, config)
      .then(resp => dispatch({ type: UPDATE_OTAGH_BAZARGANI, payload: resp.data.OtaghBazargani }))
      .catch(error => dispatch({ type: UPDATE_OTAGH_BAZARGANI_ERR }));
  };
};
