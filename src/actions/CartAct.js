import axios from "axios";
import {
  ADD_TO_CART,
  ADD_TO_CART_LOAD,
  GET_WARES_IN_CART,
  CLEAN_CART,
  GET_CART_LOADING,
  GET_CART,
  TOGGLE_CART,
  ADD_ADDRESS_TO_CART,
  ADD_ADDRESS_TO_CART_LOADING,
  CHANGE_WARE_AMOUNT,
  REGISTER_AGAIN_CART_LOAD,
  REGISTER_AGAIN_CART,
  REMOVE_FROM_CART,
  HIDE_CART,
  RU
} from "./types";

export const addToCart = ware => {
  return dispatch => {
    dispatch({ type: ADD_TO_CART_LOAD });
    return axios
      .post(`${RU}/carts/add/to/cart`, { ware }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: ADD_TO_CART, payload: resp.data.cart });
      })
      .catch(error => error.response);
  };
};

export const getCart = () => {
  return dispatch => {
    dispatch({ type: GET_CART_LOADING });
    return axios
      .get(`${RU}/carts/get/cart`, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        return dispatch({ type: GET_CART, payload: resp.data.cart });
      })
      .catch(error => error.response);
  };
};

export const removeFromCart = ({ wareId }) => {
  return dispatch => {
    dispatch({ type: GET_CART_LOADING });
    return axios
      .post(`${RU}/carts/remove/from/cart`, { wareId }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: GET_CART, payload: resp.data.cart }))
      .catch(error => error.response);
  };
};

export const addAddressToCart = ({ _id, address }) => {
  return dispatch => {
    dispatch({ type: ADD_ADDRESS_TO_CART_LOADING });
    return axios
      .post(`${RU}/carts/add/to/address`, { _id, address }, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => dispatch({ type: GET_CART, payload: resp.data.cart }))
      .catch(error => error.response);
  };
};

export const registerAgainCard = cart => {
  return dispatch => {
    dispatch({ type: REGISTER_AGAIN_CART_LOAD });
    return axios
      .post(`${RU}/carts/final/register`, cart, { headers: { sabti: localStorage.getItem("token") } })
      .then(resp => {
        dispatch({ type: REGISTER_AGAIN_CART });
        return dispatch({ type: GET_CART, payload: resp.data.cart });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};

export const onAmountChange = (_id, amount) => ({ type: CHANGE_WARE_AMOUNT, payload: { _id, amount } });

export const toggleCart = () => ({ type: TOGGLE_CART });
export const hideCart = () => ({ type: HIDE_CART });
