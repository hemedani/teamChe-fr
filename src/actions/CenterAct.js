import axios from 'axios';
import { change } from 'redux-form'
import {
	GET_CENTER, GET_CENTER_ERR, CENTER_LOAD, CLEAN_CENTER, CLEAN_RATE, GET_YOUR_RATE,
	CHANGE_QUALITY_RATE, CHANGE_QUALITY_LOADING, CHANGE_PRICE_RATE,
	CHANGE_PRICE_LOADING, CHANGE_SALESMAN_RATE, CHANGE_SALESMAN_LOADING,
	SET_EXPERT_RATE_LOADING, SET_EXPERT_RATE_SET, SET_EXPERT_RATE_ERR,
	SET_OPTION_FOR_CENTER, SET_OPTION_FOR_CENTER_LOADING,
	DOCTOR_SET_LOAD, DOCTOR_SET, DOCTOR_SET_ERR,
	OWNER_SET_LOAD, OWNER_SET, OWNER_SET_ERR,
	LOAD_EDITED_CENTER, GET_EDITED_CENTER, ERR_EDITED_CENTER,
	SET_CENTER_LIKE_LOAD, SET_CENTER_LIKE,
	SET_OTHER_ADDRESS_LOAD, SET_OTHER_ADDRESS, SET_OTHER_ADDRESS_ERR,
	CENTER_UPDATE, REMOVE_CENTER_ODD_ADD_LOADING, REMOVE_CENTER_ODD_ADD_END,
	RU } from './types';

export function getCenterById(id) {
	return function ( dispatch ) {
		dispatch( { type: CENTER_LOAD } )
		dispatch( { type: CLEAN_RATE } )
		return axios.get( `${ RU }/center`, { params: {id: id}, headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => {
				return dispatch( { type: GET_CENTER, payload: resp.data.center } )
			} )
			.catch( ( e ) => { return dispatch( { type: GET_CENTER_ERR } ) } )
	}
}

export function changeQualityRate(rating, id) {
	return function ( dispatch ) {
    dispatch( { type: CHANGE_QUALITY_LOADING } )
		return axios.post( `${ RU }/center/addqualityrate`, { qualityRate: rating, centerId: id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			dispatch( { type: GET_YOUR_RATE, payload: resp.data.rate } );
	    return dispatch( { type: CHANGE_QUALITY_RATE, payload: resp.data.center } );
		} ).catch( ( error ) => {
			// return dispatch( { type: ADD_CENTER_ERR } );
		} );

	}
}

export function setExpertRate(rate, id) {
	return function ( dispatch ) {
    dispatch( { type: SET_EXPERT_RATE_LOADING } )
		return axios.post( `${ RU }/center/setexpertrate`, { rate: rate, id: id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
	    dispatch( { type: GET_CENTER, payload: resp.data.center } );
	    return dispatch( { type: SET_EXPERT_RATE_SET } );
		} ).catch( ( error ) => {
			return dispatch( { type: SET_EXPERT_RATE_ERR } );
		} );

	}
}

export function changeSalesmanRate(rating, id) {
	return function ( dispatch ) {
    dispatch( { type: CHANGE_QUALITY_LOADING } )
		return axios.post( `${ RU }/center/addsalesmanrate`, { salesmanRate: rating, centerId: id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			dispatch( { type: GET_YOUR_RATE, payload: resp.data.rate } );
	    return dispatch( { type: CHANGE_SALESMAN_RATE, payload: resp.data.center } );
		} ).catch( ( error ) => {
			// return dispatch( { type: ADD_CENTER_ERR } );
		} );

	}
}

export function changePriceRate(rating, id) {
	return function ( dispatch ) {
    dispatch( { type: CHANGE_PRICE_LOADING } )
		return axios.post( `${ RU }/center/addpricerate`, { priceRate: rating, centerId: id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			dispatch( { type: GET_YOUR_RATE, payload: resp.data.rate } );
	    return dispatch( { type: CHANGE_PRICE_RATE, payload: resp.data.center } );
		} ).catch( ( error ) => {
			// return dispatch( { type: ADD_CENTER_ERR } );
		} );

	}
}

export function setOptionForCenter(options, id) {
	return function ( dispatch ) {
    dispatch( { type: SET_OPTION_FOR_CENTER_LOADING } )
		return axios.post( `${ RU }/center/addoptiontocenter`, { options, id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			dispatch( { type: GET_CENTER, payload: resp.data.center } );
			return dispatch( { type: SET_OPTION_FOR_CENTER } );
		} ).catch( ( error ) => {
			return dispatch( { type: SET_EXPERT_RATE_ERR } );
		} );

	}
}

export function removeOtherAddressFromCenter( centerId, addId ) {
	return function ( dispatch ) {
    dispatch( { type: REMOVE_CENTER_ODD_ADD_LOADING } )
		return axios.post( `${ RU }/center/remove/other/address`, { centerId, addId }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => {
				dispatch( { type: GET_CENTER, payload: resp.data.center } )
				return dispatch( { type: REMOVE_CENTER_ODD_ADD_END } )
			})
			.catch( ( error ) => dispatch( { type: SET_EXPERT_RATE_ERR } ) );

	}
}

export const setDoctorForCenter = ( userId, centerId ) => {
	return ( dispatch ) => {
    dispatch( { type: DOCTOR_SET_LOAD } )
		return axios.post( `${ RU }/center/set/doctor`, { userId, centerId }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => dispatch( { type: GET_CENTER, payload: resp.data.center } ))
		.catch( ( error ) =>  dispatch( { type: DOCTOR_SET_ERR } ) );
	}
}

export const setOtherAddressForCenter = ( address ) => {
	return ( dispatch ) => {
    dispatch( { type: SET_OTHER_ADDRESS_LOAD } )
		return axios.post( `${ RU }/center/set/address`, address, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => {
			return dispatch( { type: GET_CENTER, payload: resp.data.center } )
		})
		.catch( ( error ) =>  dispatch( { type: SET_OTHER_ADDRESS_ERR } ) );
	}
}

export const deleteDoctorForCenter = ( centerId ) => {
	return ( dispatch ) => {
    dispatch( { type: DOCTOR_SET_LOAD } )
		return axios.post( `${ RU }/center/delete/doctor`, { centerId }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => {
			return dispatch( { type: GET_CENTER, payload: resp.data.center } )
		})
		.catch( ( error ) =>  dispatch( { type: DOCTOR_SET_ERR } ) );
	}
}

export const setOfficeDoctorsForCenter = ( officeDoctors, centerId ) => {
	return ( dispatch ) => {
    dispatch( { type: DOCTOR_SET_LOAD } )
		return axios.post( `${ RU }/center/set/officedoctors`, { officeDoctors, centerId }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => {
			return dispatch( { type: GET_CENTER, payload: resp.data.center } )
		})
		.catch( ( error ) =>  dispatch( { type: DOCTOR_SET_ERR } ) );
	}
}

export const setLikes = ( centerId ) => {
	return ( dispatch ) => {
    dispatch( { type: SET_CENTER_LIKE_LOAD } )
		return axios.post( `${ RU }/center/set/like`, { centerId }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => dispatch( { type: SET_CENTER_LIKE, payload: resp.data.center } ))
		.catch( ( error ) =>  error);
	}
}

export const getEditedCenter = ( centerId ) => {
	return ( dispatch ) => {
    dispatch( { type: LOAD_EDITED_CENTER } )
		return axios.get( `${ RU }/center/edited`, { params: { centerId }, headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => {
				return dispatch( { type: GET_EDITED_CENTER, payload: resp.data.center } )
			} )
			.catch( ( e ) => { return dispatch( { type: ERR_EDITED_CENTER } ) } )
	}
}

export const removeCenterPic = ( _id, pic ) => {
	return ( dispatch ) => {
    dispatch( { type: LOAD_EDITED_CENTER } )
		return axios.post( `${ RU }/center/delete/pic`, { _id, pic }, { headers: { sabti: localStorage.getItem( 'token' ) } }  )
			.then( resp => dispatch( { type: CENTER_UPDATE, payload: resp.data.center } ))
			.catch( ( e ) => dispatch( { type: ERR_EDITED_CENTER } ) )
	}
}

export const setOwnerForCenter = ( userId, centerId ) => {
	return ( dispatch ) => {
    dispatch( { type: OWNER_SET_LOAD } )
		return axios.post( `${ RU }/center/set/owner`, { userId, centerId }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => {
			return dispatch( { type: GET_CENTER, payload: resp.data.center } )
		})
		.catch( ( error ) =>  dispatch( { type: OWNER_SET_ERR } ) );
	}
}

export const cleanCenter = () => ({ type : CLEAN_CENTER})
