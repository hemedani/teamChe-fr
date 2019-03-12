import axios from 'axios'
import { change } from 'redux-form'
import { GET_PROMOTIONS, GET_PROMOTIONS_ERR, ADD_PROMOTION, REMOVE_PROMOTION, PROMOTION_LOAD, 
	ADD_PROMOTION_ERR, PROMOTION_PIC_LOAD, PROMOTION_ADD_PIC, UPDATE_PROMOTION,
	PROMOTION_UPDATE_LOAD, UPDATE_PROMOTION_ERR, RU } from './types'
import { toastr } from 'react-redux-toastr'

export const getPromotions = () => {
	return ( dispatch ) => {
    dispatch( { type: PROMOTION_LOAD } )
		return axios.get( `${ RU }/promotion/paginate`, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: GET_PROMOTIONS, payload: resp.data.promotions } ))
			.catch( ( e ) => dispatch( { type: GET_PROMOTIONS_ERR, payload: e } ))
	}
}

export const getVisiblePromotion = () => {
	return ( dispatch ) => {
    dispatch( { type: PROMOTION_LOAD } )
		return axios.get( `${ RU }/promotions`, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: GET_PROMOTIONS, payload: resp.data.promotions } ))
			.catch( ( e ) => dispatch( { type: GET_PROMOTIONS_ERR, payload: e } ))
	}
}

export const addPromotion = ( promotion ) => {
	return ( dispatch ) => {
    dispatch( { type: PROMOTION_LOAD } )
		return axios.post( `${ RU }/promotion/add`, promotion, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => dispatch( { type: ADD_PROMOTION, payload: resp.data.promotion } ))
		.catch( ( error ) => dispatch( { type: ADD_PROMOTION_ERR, payload: error } ));

	}
}

export const updatePromotion = ( promotion ) => {
	return ( dispatch ) => {
    dispatch( { type: PROMOTION_UPDATE_LOAD } )
		return axios.post( `${ RU }/promotion/update`, promotion, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
	    return dispatch( { type: UPDATE_PROMOTION, payload: resp.data.promotion } );
		} )
		.catch( ( error ) => dispatch( { type: UPDATE_PROMOTION_ERR } ));

	}
}

export const removePromotion = ( _id ) => {
	return ( dispatch ) => {
    dispatch( { type: PROMOTION_LOAD } )
		return axios.post( `${ RU }/promotion/remove`, { _id }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
			return dispatch( { type: REMOVE_PROMOTION, payload: _id } );
		} ).catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } );
		} );

	}
}

export const promotionUploadPic = ({ file }) => {
	return ( dispatch ) => {
    dispatch({type: PROMOTION_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		let config = {
			onUploadProgress: ( progressEvent ) => { let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) },
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/upload`, data, config )
			.then(resp => {
				dispatch(change('AddPromotionModal', 'picRef', resp.data._id))
				dispatch(change('AddPromotionModal', 'pic', resp.data.name))
				return dispatch( { type: PROMOTION_ADD_PIC, payload: resp.data } )
			}).catch(error => {
			})

	}
}

export const promotionChangePic = ({ file, id }) => {
	return ( dispatch ) => {
    dispatch({type: PROMOTION_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		data.append( 'id', id )
		let config = {
			onUploadProgress: ( progressEvent ) => { let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) }, 
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/change/promotion/pic`, data, config )
			.then(resp =>  dispatch( { type: UPDATE_PROMOTION, payload: resp.data.promotion } ))
			.catch(error =>  dispatch( { type: UPDATE_PROMOTION_ERR, payload: error } ))
	}
}
