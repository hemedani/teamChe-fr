import axios from "axios";
import {
  GET_RATE,
  GET_NEXT_RATE,
  RATE_LOAD,
  GET_YOUR_RATE,
  ACCEPTED_RATE,
  ACCEPT_RATE_LOAD,
  DENIED_RATE,
  WARE_RATE_LOAD,
  GET_WARE_RATE,
  TEXT_RATE_LOAD,
  CHANGE_YOUR_WARE_RATE,
  CHANGE_WARE_RATE_LOADING,
  SET_REPLY_LOAD,
  SET_REPLY,
  SET_REPLY_ERR,
  GET_YOUR_WARE_RATE_ERR,
  CLEAN_WARE_RATES,
  CLEAN_YOUR_WARE_RATE,
  CLEAN_RATE,
  ADD_VOTE_LOAD,
  UP_RATE_IN_RATES,
  UP_VOTE_MASSAGE,
  RU
} from "./types";
import { toastr } from "react-redux-toastr";

export const cleanWareRates = () => ({ type: CLEAN_WARE_RATES });

export const cleanYourWareRate = () => ({ type: CLEAN_YOUR_WARE_RATE });

export const cleanAllRates = () => ({ type: CLEAN_RATE });

export const getRating = (centerId, rateId) => {
  return dispatch => {
    dispatch({ type: RATE_LOAD });
    return axios
      .get(`${RU}/rates`, {
        params: { centerId: centerId, rateId: rateId }
      })
      .then(resp => {
        return dispatch({ type: GET_RATE, payload: resp.data.rates });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const getWareRating = (wareId, rateId) => {
  return dispatch => {
    dispatch({ type: WARE_RATE_LOAD });
    return axios
      .get(`${RU}/rates/ware`, { params: { wareId: wareId, rateId: rateId } })
      .then(resp => dispatch({ type: GET_WARE_RATE, payload: resp.data.rates }))
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const getNotAcceptedRates = query => {
  return dispatch => {
    dispatch({ type: RATE_LOAD });
    return axios
      .get(`${RU}/rates/notaccepted`, { params: query, headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: GET_RATE, payload: resp.data.rates });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const getNextRates = query => {
  return dispatch => {
    dispatch({ type: RATE_LOAD });
    return axios
      .get(`${RU}/rates/notaccepted`, { params: query, headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: GET_NEXT_RATE, payload: resp.data.rates });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const getYourRate = centerId => {
  return dispatch => {
    dispatch({ type: RATE_LOAD });
    return axios
      .get(`${RU}/rates/yourrate`, {
        params: { centerId: centerId },
        headers: { sabti: localStorage.getItem("token") }
      })
      .then(resp => {
        return dispatch({ type: GET_YOUR_RATE, payload: resp.data.rate });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const sendRateText = ({ yourRateId, textRate, centerId }) => {
  return dispatch => {
    dispatch({ type: TEXT_RATE_LOAD });
    return axios
      .post(
        `${RU}/rates/addtext`,
        { rateId: yourRateId, rateText: textRate, centerId },
        {
          headers: { sabti: localStorage.getItem("token") }
        }
      )
      .then(resp => {
        toastr.success("با تشکر", "نظر شما با موفقیت ثبت شد");
        return dispatch({ type: GET_YOUR_RATE, payload: resp.data.rate });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const sendVote = ({ rateId, plus, minus }) => {
  return dispatch => {
    dispatch({ type: ADD_VOTE_LOAD });
    return axios
      .post(
        `${RU}/vote/add`,
        { rateId: rateId, plus, minus },
        {
          headers: { sabti: localStorage.getItem("token") }
        }
      )
      .then(resp => {
        if (resp.data.massage) {
          toastr.info("با تشکر", resp.data.massage);
          return dispatch({ type: UP_VOTE_MASSAGE, payload: resp.data.massage });
        } else {
          toastr.success("با تشکر", "رأی شما با موفقیت ثبت شد");
          return dispatch({ type: UP_RATE_IN_RATES, payload: resp.data.rate });
        }
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const sendWareRateText = (rateId, rateText, wareId) => {
  return dispatch => {
    dispatch({ type: CHANGE_WARE_RATE_LOADING });
    return axios
      .post(
        `${RU}/rates/add/ware/text`,
        { rateId, rateText, wareId },
        {
          headers: { sabti: localStorage.getItem("token") }
        }
      )
      .then(resp => {
        toastr.success("با تشکر", "نظر شما با موفقیت ثبت شد");
        return dispatch({ type: CHANGE_YOUR_WARE_RATE, payload: resp.data.rate });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const deniedRate = ({ rateId }) => {
  return dispatch => {
    dispatch({ type: ACCEPT_RATE_LOAD, payload: rateId });
    return axios
      .post(
        `${RU}/rates/deniedRate`,
        { rateId },
        {
          headers: { sabti: localStorage.getItem("token") }
        }
      )
      .then(resp => {
        return dispatch({ type: DENIED_RATE, payload: resp.data.rate });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const justDeniedRate = ({ rateId }) => {
  return dispatch => {
    dispatch({ type: ACCEPT_RATE_LOAD, payload: rateId });
    return axios
      .post(
        `${RU}/rates/just/denied`,
        { rateId },
        {
          headers: { sabti: localStorage.getItem("token") }
        }
      )
      .then(resp => dispatch({ type: DENIED_RATE, payload: resp.data.rate }))
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const acceptRate = ({ rateId }) => {
  return dispatch => {
    dispatch({ type: ACCEPT_RATE_LOAD, payload: rateId });
    return axios
      .post(
        `${RU}/rates/acceptRate`,
        { rateId },
        {
          headers: { sabti: localStorage.getItem("token") }
        }
      )
      .then(resp => {
        return dispatch({ type: ACCEPTED_RATE, payload: resp.data.rate });
      })
      .catch(e => {
        // dispatch( { type: KASABE_ERR } )
      });
  };
};

export const setReply = rate => {
  return dispatch => {
    dispatch({ type: SET_REPLY_LOAD });
    return axios
      .post(`${RU}/rates/set/reply`, rate, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: SET_REPLY, payload: resp.data.rate }))
      .catch(e => dispatch({ type: SET_REPLY_ERR, payload: e.response }));
  };
};

export const getYourWareRate = wareId => {
  return dispatch => {
    dispatch({ type: CHANGE_WARE_RATE_LOADING });
    return axios
      .get(`${RU}/rates/your/ware/rate`, { headers: { sabti: localStorage.getItem("token") }, params: { wareId } })
      .then(resp => dispatch({ type: CHANGE_YOUR_WARE_RATE, payload: resp.data.rate }))
      .catch(e => dispatch({ type: GET_YOUR_WARE_RATE_ERR, payload: e.response }));
  };
};
