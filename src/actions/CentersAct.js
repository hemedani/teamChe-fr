import axios from "axios";
import {
  GET_CENTERS,
  ADD_CENTER,
  REMOVE_CENTER,
  CENTERS_LOAD,
  YOUR_CENTER,
  ADD_CENTER_ERR,
  YOUR_CITY,
  CENTER_PIC_LOAD,
  REMOVE_CENTER_ERR,
  CLEAN_CENTERS,
  CENTER_UPDATE_LOAD,
  CENTER_UPDATE,
  CENTER_UPDATE_ERR,
  PIC_UPLOAD_PERCENT,
  PICS_UPLOADED,
  CENTER_PIC_LOAD_DONE,
  CLEAN_PIC_UPLOAD_PERCENT,
  SET_CENTER_TO_POPUP,
  SET_POPUP_TO_NULL,
  GET_CENTERS_COUNT_LOAD,
  GET_CENTERS_COUNT,
  GET_CENTERS_COUNT_ERR,
  RU
} from "./types";

export const getCenterWithQuery = query => {
  return dispatch => {
    dispatch({ type: CENTERS_LOAD });
    return axios
      .get(`${RU}/centers/params`, {
        params: query
      })
      .then(resp => {
        dispatch({ type: YOUR_CITY, payload: resp.data.city });
        return dispatch({ type: GET_CENTERS, payload: resp.data.centers });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const getCenters = query => {
  return dispatch => {
    dispatch({ type: CENTERS_LOAD });
    return axios
      .get(`${RU}/centers`, { params: query })
      .then(resp => {
        dispatch({ type: YOUR_CITY, payload: resp.data.city });
        return dispatch({ type: GET_CENTERS, payload: resp.data.centers });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const cleanCenters = () => ({ type: CLEAN_CENTERS });
export const cleanPicUpPercent = () => ({ type: CLEAN_PIC_UPLOAD_PERCENT });
export const setCenterToPopup = center => ({ type: SET_CENTER_TO_POPUP, payload: center });
export const setPopupToNull = () => ({ type: SET_POPUP_TO_NULL });

export const yourCenter = centerid => {
  return function(dispatch) {
    dispatch({ type: CENTERS_LOAD });
    return axios
      .get(`${RU}/yourcenter`, {
        params: { centerid },
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => {
        dispatch({ type: YOUR_CENTER, payload: resp.data.center });
        return resp.data.center;
      })
      .catch(e => {
        // dispatch( { type: TAXIBS_ERR } )
      });
  };
};

export const addCenter = center => {
  return dispatch => {
    dispatch({ type: CENTERS_LOAD });
    return axios
      .post(`${RU}/center/add`, center, {
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => dispatch({ type: ADD_CENTER, payload: resp.data.center }))
      .catch(error => {
        console.log("==================");
        console.log("err addCenter", JSON.stringify(error, null, 2));
        console.log("==================");

        return dispatch({ type: ADD_CENTER_ERR });
      });
  };
};

export function updateCenter(center) {
  return function(dispatch) {
    dispatch({ type: CENTERS_LOAD });
    return axios
      .post(`${RU}/center/edit`, center, {
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => {
        return dispatch({ type: CENTER_UPDATE, payload: resp.data.center });
      })
      .catch(error => {
        return dispatch({ type: ADD_CENTER_ERR });
      });
  };
}

export function removeCenter(id) {
  return function(dispatch) {
    dispatch({ type: CENTERS_LOAD });
    return axios
      .post(
        `${RU}/center/remove`,
        { id },
        {
          headers: { sabti: localStorage.getItem("token") }
        }
      )
      .then(resp => {
        return dispatch({ type: REMOVE_CENTER, payload: id });
      })
      .catch(error => {
        return dispatch({ type: REMOVE_CENTER_ERR });
      });
  };
}

// export function centerUploadPic({ file }) {
// 	return function ( dispatch ) {
//     dispatch({type: CENTER_PIC_LOAD })
// 		let data = new FormData( )
// 		data.append( 'file', file )
// 		let config = {
// 			onUploadProgress: function ( progressEvent ) {
// 				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
// 				console.log( 'the percent of uploading ... ', percentCompleted )
// 			},
// 			headers: {
// 				sabti: localStorage.getItem( 'token' )
// 			}
// 		}
// 		return axios.put( `${ RU }/upload`, data, config )
// 			.then(resp => {
// 				dispatch(change('addCenterModal', 'picRef', resp.data._id))
// 				dispatch(change('addCenterModal', 'pic', resp.data.name))
// 				return dispatch( { type: CENTER_ADD_PIC, action: resp.data } )
// 			}).catch(error => {
// 				console.log( error.response.data )
// 			})

// 	}
// }

export function centerUploadPic({ files }) {
  return function(dispatch) {
    dispatch({ type: CENTER_PIC_LOAD });

    // let data = new FormData( )
    // data.append( 'file', files )
    // let config = {
    // 	onUploadProgress: function ( progressEvent ) {
    // 		let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
    // 		console.log( 'the percent of uploading ... ', percentCompleted )
    // 	},
    // 	headers: {
    // 		sabti: localStorage.getItem( 'token' )
    // 	}
    // }
    // return axios.put( `${ RU }/upload/array/house`, data, config )
    // 	.then(resp => {
    // 		dispatch(change('addHouseModal', 'picRef', resp.data._id))
    // 		dispatch(change('addHouseModal', 'pic', resp.data.name))
    // 		console.log( resp )
    // 		return dispatch( { type: CENTER_ADD_PIC, action: resp.data } )
    // 	}).catch(error => {
    // 		console.log( error.response.data )
    // 	})

    // Push all the axios request promise into a single array
    const uploaders = files.map((file, i) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      let config = {
        onUploadProgress: progressEvent => {
          let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch({ type: PIC_UPLOAD_PERCENT, payload: { i, percent } });
        },
        headers: {
          sabti: localStorage.getItem("token")
        }
      };

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.put(`${RU}/upload`, formData, config).then(resp => {
        dispatch({ type: PICS_UPLOADED, payload: resp.data });
        return resp.data;
      });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(resp => dispatch({ type: CENTER_PIC_LOAD_DONE }));
  };
}

export const centerChangePic = ({ file, id }) => {
  return dispatch => {
    dispatch({ type: CENTER_UPDATE_LOAD });
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
      .put(`${RU}/change/center/pic`, data, config)
      .then(resp => {
        return dispatch({ type: CENTER_UPDATE, payload: resp.data.center });
      })
      .catch(error => {
        return dispatch({ type: CENTER_UPDATE_ERR });
      });
  };
};

export const addPicToCenter = center => {
  return dispatch => {
    dispatch({ type: CENTER_UPDATE_LOAD });
    return axios
      .post(`${RU}/center/add/pic`, center, {
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => {
        return dispatch({ type: CENTER_UPDATE, payload: resp.data.center });
      })
      .catch(error => {
        return dispatch({ type: CENTER_UPDATE_ERR });
      });
  };
};

export const GetCentersCount = () => {
  return dispatch => {
    dispatch({ type: GET_CENTERS_COUNT_LOAD });
    return axios
      .get(`${RU}/center/get/count`, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: GET_CENTERS_COUNT, payload: resp.data.CentersCount }))
      .catch(error => dispatch({ type: GET_CENTERS_COUNT_ERR, payload: error }));
  };
};
