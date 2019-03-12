import axios from 'axios'
import { change } from 'redux-form'
import { GET_WARE_OPTIONS, GET_WARE_OPTIONS_ERR, ADD_WARE_OPTION, REMOVE_WARE_OPTION, WARE_OPTION_LOAD, 
	ADD_WARE_OPTION_ERR, WARE_OPTION_PIC_LOAD, WARE_OPTION_ADD_PIC, UPDATE_WARE_OPTION,
	WARE_OPTION_UPDATE_LOAD, UPDATE_WARE_OPTION_ERR, RU } from './types'
import { toastr } from 'react-redux-toastr'

export const getWareOptions = () => {
	return ( dispatch ) => {
    dispatch( { type: WARE_OPTION_LOAD } )
		return axios.get( `${ RU }/option/ware/options`, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: GET_WARE_OPTIONS, payload: resp.data.wareOptions } ))
			.catch( ( e ) => dispatch( { type: GET_WARE_OPTIONS_ERR } ))
	}
}

export const addWareOption = ( { name, enName, pic, picRef } ) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_OPTION_LOAD } )
		return axios.post( `${ RU }/option/ware/add`, { name, enName, pic, picRef }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => dispatch( { type: ADD_WARE_OPTION, payload: resp.data.wareOption } ))
		.catch( ( error ) => dispatch( { type: ADD_WARE_OPTION_ERR } ));

	}
}

export const updateWareOption = ( { _id, name, enName } ) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_OPTION_UPDATE_LOAD } )
		return axios.post( `${ RU }/option/ware/update`, { _id, name, enName }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
	    return dispatch( { type: UPDATE_WARE_OPTION, payload: resp.data.wareOption } );
		} )
		.catch( ( error ) => dispatch( { type: UPDATE_WARE_OPTION_ERR } ));

	}
}

export const removeWareOption = ( _id ) => {
	return ( dispatch ) => {
    dispatch( { type: WARE_OPTION_LOAD } )
		return axios.post( `${ RU }/option/ware/remove`, { _id }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
			return dispatch( { type: REMOVE_WARE_OPTION, payload: _id } );
		} ).catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } );
		} );

	}
}

export const wareOptionUploadPic = ({ file }) => {
	return ( dispatch ) => {
    dispatch({type: WARE_OPTION_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		let config = {
			onUploadProgress: ( progressEvent ) => { let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) },
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/upload`, data, config )
			.then(resp => {
				dispatch(change('AddWareOptionModal', 'picRef', resp.data._id))
				dispatch(change('AddWareOptionModal', 'pic', resp.data.name))
				return dispatch( { type: WARE_OPTION_ADD_PIC, payload: resp.data } )
			}).catch(error => {
			})

	}
}

export const wareOptionChangePic = ({ file, id }) => {
	return ( dispatch ) => {
    dispatch({type: WARE_OPTION_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		data.append( 'id', id )
		let config = {
			onUploadProgress: ( progressEvent ) => { let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) }, 
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/change/wareOption/pic`, data, config )
			.then(resp =>  dispatch( { type: UPDATE_WARE_OPTION, payload: resp.data.wareOption } ))
			.catch(error =>  dispatch( { type: UPDATE_WARE_OPTION_ERR, payload: error } ))
	}
}
