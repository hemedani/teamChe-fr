import axios from 'axios';
import { REGISTER_PURCHASE, REGISTER_PURCHASE_LOAD, GET_PURCHASE_LOAD, GET_PURCHASE, SET_FOR_PAID, GET_FOR_PAID_PURCHASE_LOAD, 
	GET_FOR_PAID_PURCHASE_ERR, CLEAN_CART, SEND_COST_TO_ZARINPAL_LOAD, RU } from './types';

export const registerPurchase = ( purchase ) => {
	return ( dispatch ) => {
		dispatch({ type: REGISTER_PURCHASE_LOAD })
		return axios.post(`${ RU }/purchase/register`, purchase, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then( resp => {
				dispatch({ type: SET_FOR_PAID, payload: resp.data.purchase })
				dispatch({ type: CLEAN_CART })
				return dispatch( { type: REGISTER_PURCHASE, payload: resp.data.purchase } )
			} )
			.catch( ( error ) =>  console.log('error registerPurchase => ', error.response))
	}
}

export const getPurchases = ( ) => {
	return ( dispatch ) => {
		dispatch({ type: GET_PURCHASE_LOAD })
		return axios.get(`${ RU }/purchase/get/own/purchases`, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then( resp => dispatch( { type: GET_PURCHASE, payload: resp.data.purchases } ))
			.catch( ( error ) =>  error.response )
	}
}

export const getAllPurchases = () => {
	return ( dispatch ) => {
		dispatch({ type: GET_PURCHASE_LOAD })
		return axios.get(`${ RU }/purchase/get/all/purchases`, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then( resp => dispatch( { type: GET_PURCHASE, payload: resp.data.purchases } ))
			.catch( ( error ) =>  error.response )
	}
}

export const getForPaidPurchase = ( _id ) => {
	return ( dispatch ) => {
		dispatch({ type: GET_FOR_PAID_PURCHASE_LOAD })
		return axios.get(`${ RU }/purchase/get/purchase`, { params: { _id }, headers: { sabti: localStorage.getItem( 'token' ) } })
			.then( resp => dispatch( { type: SET_FOR_PAID, payload: resp.data.purchase } ))
			.catch( ( error ) =>  dispatch({ type: GET_FOR_PAID_PURCHASE_ERR, payload: error.response }) )
	}
}

export const sendCostForZarinPal = ( purchase ) => {
	return ( dispatch ) => {
		dispatch({ type: SEND_COST_TO_ZARINPAL_LOAD })
		return axios.post(`${ RU }/purchase/send/zarinpal`, purchase, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then( resp => dispatch( { type: SET_FOR_PAID, payload: resp.data.purchase, zarin: resp.data.zarin } ))
			.catch( ( error ) =>  dispatch({ type: GET_FOR_PAID_PURCHASE_ERR, payload: error.response }) )
	}
}

export const setForPaid = (purchase) => ({ type: SET_FOR_PAID, payload: purchase })
