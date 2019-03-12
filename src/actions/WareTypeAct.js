import axios from 'axios'
import { change } from 'redux-form'
import { GET_WARE_TYPES, ADD_WARE_TYPE, REMOVE_WARE_TYPE, WARE_TYPE_LOAD, YOUR_WARE_TYPE, ADD_WARE_TYPE_ERR, WARE_TYPE_PIC_LOAD, WARE_TYPE_ADD_PIC, WARE_TYPE_UPDATE, WARE_TYPE_UPDATE_ERR, WARE_TYPE_UPDATE_LOAD, RU } from './types'
import { toastr } from 'react-redux-toastr'

export function getWareTypes() {
	return function ( dispatch ) {
    dispatch( { type: WARE_TYPE_LOAD } )
		return axios.get( `${ RU }/wareTypes`, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			return dispatch( { type: GET_WARE_TYPES, payload: resp.data.wareTypes } )
		} ).catch( ( e ) => {
      // dispatch( { type: KASABE_ERR } )
		} )
	}
}

export function yourWareType(typeid) {
	return function ( dispatch ) {
    dispatch( { type: WARE_TYPE_LOAD } )
		return axios.get( `${ RU }/yourWareType`, {
      params: { typeid },
			headers: { sabti: localStorage.getItem( 'token' ) }
		})
    .then( resp => {
			dispatch( { type: YOUR_WARE_TYPE, payload: resp.data.wareType } )
      return resp.data.type
		})
    .catch( ( e ) => {
      // dispatch( { type: TAXIBS_ERR } )
		})
	}
}

export function addWareType( { name, enName, pic, picRef } ) {
	return function ( dispatch ) {
    dispatch( { type: WARE_TYPE_LOAD } )
		return axios.post( `${ RU }/wareType/add`, { name, enName, pic, picRef }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
	    return dispatch( { type: ADD_WARE_TYPE, payload: resp.data.wareType } );
		} ).catch( ( error ) => {
			return dispatch( { type: ADD_WARE_TYPE_ERR } );
		} );

	}
}

export function removeWareType( _id ) {
	return function ( dispatch ) {
    dispatch( { type: WARE_TYPE_LOAD } )
		return axios.post( `${ RU }/wareType/remove`, { _id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
			return dispatch( { type: REMOVE_WARE_TYPE, payload: _id } );
		} ).catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } );
		} );

	}
}

export const wareTypeUploadPic = ({ file }) => {
	return ( dispatch ) => {
    dispatch({type: WARE_TYPE_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		let config = {
			onUploadProgress: ( progressEvent ) => {
				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
			},
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/upload`, data, config )
			.then(resp => {
				dispatch(change('AddWareTypeModal', 'picRef', resp.data._id))
				dispatch(change('AddWareTypeModal', 'pic', resp.data.name))
				return dispatch( { type: WARE_TYPE_ADD_PIC, payload: resp.data } )
			})
			.catch(err => dispatch( { type: 'WARE_TYPE_ADD_PIC_ERR', payload: err } ))

	}
}

export function wareTypeChangePic({ file, id }) {
	return function ( dispatch ) {
    dispatch({type: WARE_TYPE_UPDATE_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		data.append( 'id', id )
		let config = {
			onUploadProgress: function ( progressEvent ) {
				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
			}, headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/change/waretype/pic`, data, config )
			.then(resp => {
				return dispatch( { type: WARE_TYPE_UPDATE, payload: resp.data.wareType } )
			}).catch(error => {
				return dispatch( { type: WARE_TYPE_UPDATE_ERR } )
			})

	}
}


export const updateWareType = ( { _id, name, enName } ) => {
	return function ( dispatch ) {
    dispatch( { type: WARE_TYPE_UPDATE_LOAD } )
		return axios.post( `${ RU }/wareType/update`, { _id, name, enName }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
	    return dispatch( { type: WARE_TYPE_UPDATE, payload: resp.data.wareType } );
		} ).catch( ( error ) => {
			return dispatch( { type: WARE_TYPE_UPDATE_ERR } );
		} );

	}
}
