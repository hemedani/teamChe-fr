import axios from 'axios';
import { GET_CONFIG_LOADING, GET_CONFIG, GET_CONFIG_ERR, CHANGE_KEY_VALUE_CONFIG, RU } from './types';

export const getConfig = () => {
	return ( dispatch ) => {
		dispatch({ type: GET_CONFIG_LOADING })
		return axios.get(`${ RU }/json/get/conf`, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then( resp => dispatch( { type: GET_CONFIG, payload: resp.data.config } ))
			.catch( ( error ) => dispatch( { type: GET_CONFIG_ERR, payload: error.response } )  )
	}
}

export const setConfig = ( keyValue ) => {
	return ( dispatch ) => {
		dispatch({ type: GET_CONFIG_LOADING })
		return axios.post(`${ RU }/json/set/onf`, keyValue, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then( resp => dispatch( { type: GET_CONFIG, payload: resp.data.config } ))
			.catch( ( error ) => dispatch( { type: GET_CONFIG_ERR, payload: error.response } )  )
	}
}

export const changeKeyValueConfig = ( payload ) => ({ type: CHANGE_KEY_VALUE_CONFIG, payload })
