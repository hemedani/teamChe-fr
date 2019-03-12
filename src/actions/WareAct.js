import axios from 'axios';
import { change } from 'redux-form';
import { 
	GET_WARES, ADD_WARE, REMOVE_WARE, REMOVE_WARE_ERR, WARE_LOAD, WARE_NP_LOAD, SELECTED_WARE, 
	ADD_WARE_ERR, WARE_PIC_LOAD, WARE_ADD_PIC,LAST_WARE, FIRST_WARE, WARE_ADD_LOAD, CLEAR_QUERY_WARE,
	CHANGE_YOUR_WARE_RATE, CHANGE_WARE_RATE_LOADING, CLEAN_SELECTED_WARE, UPDATE_WARE, UPDATE_WARE_ERR, WARE_UPDATE_LOAD,
	GET_SAILS_SORTED_WARES_LOAD, GET_SAILS_SORTED_WARES, GET_FAVORITE_SORTED_WARES_LOAD, GET_FAVORITE_SORTED_WARES, RU } from './types';
import { toastr } from 'react-redux-toastr'

export const getWares = (query, getWhat) => {
	const loader = getWhat ? (getWhat === 'sailsCount' ? GET_SAILS_SORTED_WARES_LOAD : GET_FAVORITE_SORTED_WARES_LOAD) : WARE_LOAD;
	const getWare = getWhat ? (getWhat === 'sailsCount' ? GET_SAILS_SORTED_WARES : GET_FAVORITE_SORTED_WARES) : GET_WARES
	return ( dispatch ) => {
    dispatch( { type: loader } )
		return axios.get( `${ RU }/wares`, {
			headers: { sabti: localStorage.getItem( 'token' ) }, params: query 
		} )
		.then( resp => dispatch( { type: getWare, payload: resp.data.wares } ) )
		.catch( ( e ) => {
      // dispatch( { type: KASABE_ERR } )
		} )
	}
}

export const getCenterWares = (centerId) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_LOAD } )
		return axios.get( `${ RU }/wares/get/center`, { params: { centerId } } )
			.then( resp => dispatch( { type: GET_WARES, payload: resp.data.wares } ))
			.catch( ( e ) => {
				// dispatch( { type: KASABE_ERR } )
			} )
	}
}

export const clearQueryWare = () => ({ type: CLEAR_QUERY_WARE })

export const getQueryWare = (query, what) => {
	return ( dispatch ) => {
    dispatch( { type: what + '_LOAD' } )
		return axios.get( `${ RU }/ware/wares`, { params: query } )
			.then( resp => dispatch( { type: what, payload: resp.data.wares } ))
			.catch( ( e ) => {
				// dispatch( { type: KASABE_ERR } )
			} )
	}
}

export const getWareById = (id) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_LOAD } )
		return axios.get( `${ RU }/ware/getbyid`, {
      params: { id },
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			return dispatch( { type: SELECTED_WARE, payload: resp.data.ware } )
		} ).catch( ( e ) => {
      // dispatch( { type: KASABE_ERR } )
		} )
	}
}

export const getNextWare = ({id, centerId}) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_NP_LOAD } )
		return axios.get( `${ RU }/ware/next`, {
      params: { id, centerId },
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			if (resp.data.ware) {
				return dispatch( { type: SELECTED_WARE, payload: resp.data.ware } )
			} else {
				return dispatch( { type: LAST_WARE, payload: resp.data.ware } )
			}
		} ).catch( ( e ) => {
      // dispatch( { type: KASABE_ERR } )
		} )
	}
}

export const getPreviousWare = ({ id, centerId }) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_NP_LOAD } )
		return axios.get( `${ RU }/ware/previous`, { params: { id, centerId }, headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			if (resp.data.ware) {
				return dispatch( { type: SELECTED_WARE, payload: resp.data.ware } )
			} else {
				return dispatch( { type: FIRST_WARE, payload: resp.data.ware } )
			}
		} ).catch( ( e ) => {
      // dispatch( { type: KASABE_ERR } )
		} )
	}
}

export const addWare = ( wareObj ) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_ADD_LOAD } )
		return axios.post( `${ RU }/ware/add`, wareObj, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: ADD_WARE, payload: resp.data.ware } ))
			.catch( ( error ) => dispatch( { type: ADD_WARE_ERR } ))
	}
}


export const updateWare = ( ware ) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_UPDATE_LOAD } )
		return axios.post( `${ RU }/ware/edit`, ware, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `بروزرسانی با موفقیت انجام شد`)
	    return dispatch( { type: UPDATE_WARE, payload: resp.data.ware } );
		} )
		.catch( ( error ) => dispatch( { type: UPDATE_WARE_ERR } ));

	}
}

export const removeWare = ( wrObj ) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_LOAD } )
		return axios.post( `${ RU }/ware/remove`, wrObj, { 	headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: REMOVE_WARE, payload: resp.data.ware } ))
			.catch( ( error ) => dispatch( { type: REMOVE_WARE_ERR } ))

	}
}

export const wareUploadPic = ({ file }) => {
	return ( dispatch ) => {
    dispatch({type: WARE_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		let config = {
			onUploadProgress: function ( progressEvent ) {
				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
			},
			headers: {
				sabti: localStorage.getItem( 'token' )
			}
		}
		return axios.put( `${ RU }/upload`, data, config )
			.then(resp => {
				dispatch(change('AddWareModal', 'picRef', resp.data._id))
				dispatch(change('AddWareModal', 'pic', resp.data.name))
				return dispatch( { type: WARE_ADD_PIC, action: resp.data } )
			}).catch(error => {
			})

	}
}

export const changeWareRate = (rating, id) => {
	return ( dispatch ) => {
    dispatch( { type: CHANGE_WARE_RATE_LOADING } )
		return axios.post( `${ RU }/rates/change/ware/rate`, { wareRate: rating, wareId: id }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			dispatch( { type: SELECTED_WARE, payload: resp.data.ware } )
			return dispatch( { type: CHANGE_YOUR_WARE_RATE, payload: resp.data.rate } )
		})
		.catch( ( error ) => {
			// return dispatch( { type: ADD_CENTER_ERR } );
		} );

	}
}

export const cleanSelectedWare = () => ({ type: CLEAN_SELECTED_WARE })
