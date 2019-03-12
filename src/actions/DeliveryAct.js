import axios from 'axios'
import { change } from 'redux-form'
import { GET_DELIVERIES, ADD_DELIVERY, REMOVE_DELIVERY, DELIVERY_LOAD, ADD_DELIVERY_ERR, DELIVERY_PIC_LOAD, DELIVERY_ADD_PIC, DELIVERY_ADD_PIC_ERR,
	UPDATE_DELIVERY, UPDATE_DELIVERY_ERR, DELIVERY_UPDATE_LOAD, RU } from './types'
	import { toastr } from 'react-redux-toastr'

export const getDeliveries = () => {
	return ( dispatch ) => {
    dispatch( { type: DELIVERY_LOAD } )
		return axios.get( `${ RU }/deliveries`, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			return dispatch( { type: GET_DELIVERIES, payload: resp.data.deliveries } )
		} ).catch( ( e ) => {
      // dispatch( { type: KASABE_ERR } )
		} )
	}
}

export const addDelivery = ( delivery ) => {
	return ( dispatch ) => {
    dispatch( { type: DELIVERY_LOAD } )
		return axios.post( `${ RU }/delivery/add`, delivery, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
	    return dispatch( { type: ADD_DELIVERY, payload: resp.data.delivery } );
		} ).catch( ( error ) => {
			return dispatch( { type: ADD_DELIVERY_ERR } );
		} );

	}
}

export const updateDelivery = ( delivery ) => {
	return ( dispatch ) => {
    dispatch( { type: DELIVERY_UPDATE_LOAD } )
		return axios.post( `${ RU }/delivery/update`, delivery, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
	    return dispatch( { type: UPDATE_DELIVERY, payload: resp.data.delivery } );
		} ).catch( ( error ) => {
			return dispatch( { type: UPDATE_DELIVERY_ERR } );
		} );

	}
}

export const removeDelivery = ( _id ) => {
	return ( dispatch ) => {
    dispatch( { type: DELIVERY_LOAD } )
		return axios.post( `${ RU }/delivery/remove`, { _id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
			return dispatch( { type: REMOVE_DELIVERY, payload: _id } );
		} ).catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } );
		} );

	}
}

export const deliveryUploadPic = ({ file }) => {
	return ( dispatch ) => {
    dispatch({type: DELIVERY_PIC_LOAD })
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
				dispatch(change('AddDeliveryModal', 'picRef', resp.data._id))
				dispatch(change('AddDeliveryModal', 'pic', resp.data.name))
				return dispatch( { type: DELIVERY_ADD_PIC, payload: resp.data } )
			})
			.catch(err => dispatch( { type: DELIVERY_ADD_PIC_ERR, payload: err } ))

	}
}


export const deliveryChangePic = ({ file, id }) => {
	return ( dispatch ) => {
    dispatch({type: DELIVERY_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		data.append( 'id', id )
		let config = {
			onUploadProgress: ( progressEvent ) => {
				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
			}, 
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/change/delivery/pic`, data, config )
			.then(resp => {
				return dispatch( { type: UPDATE_DELIVERY, payload: resp.data.delivery } )
			}).catch(error => {
				return dispatch( { type: UPDATE_DELIVERY_ERR } )
			})

	}
}
