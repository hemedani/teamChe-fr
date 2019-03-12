import axios from 'axios'
import { change } from 'redux-form'
import { GET_WARESLIDERS, GET_WARESLIDERS_ERR, ADD_WARESLIDER, REMOVE_WARESLIDER, WARESLIDER_LOAD, 
	ADD_WARESLIDER_ERR, WARESLIDER_PIC_LOAD, WARESLIDER_ADD_PIC, UPDATE_WARESLIDER,
	WARESLIDER_UPDATE_LOAD, UPDATE_WARESLIDER_ERR, RU } from './types'
import { toastr } from 'react-redux-toastr'

export const getWareSliders = () => {
	return ( dispatch ) => {
    dispatch( { type: WARESLIDER_LOAD } )
		return axios.get( `${ RU }/wareSlider/paginate`, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: GET_WARESLIDERS, payload: resp.data.wareSliders } ))
			.catch( ( e ) => dispatch( { type: GET_WARESLIDERS_ERR, payload: e } ))
	}
}

export const getWareSlidersVisible = () => {
	return ( dispatch ) => {
    dispatch( { type: WARESLIDER_LOAD } )
		return axios.get( `${ RU }/wareSliders`, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: GET_WARESLIDERS, payload: resp.data.wareSliders } ))
			.catch( ( e ) => dispatch( { type: GET_WARESLIDERS_ERR, payload: e } ))
	}
}

export const addWareSlider = ( wareSlider ) => {
	return ( dispatch ) => {
    dispatch( { type: WARESLIDER_LOAD } )
		return axios.post( `${ RU }/wareSlider/add`, wareSlider, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => dispatch( { type: ADD_WARESLIDER, payload: resp.data.wareSlider } ))
		.catch( ( error ) => dispatch( { type: ADD_WARESLIDER_ERR, payload: error } ));

	}
}

export const updateWareSlider = ( wareSlider ) => {
	return ( dispatch ) => {
    dispatch( { type: WARESLIDER_UPDATE_LOAD } )
		return axios.post( `${ RU }/wareSlider/update`, wareSlider, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
	    return dispatch( { type: UPDATE_WARESLIDER, payload: resp.data.wareSlider } );
		} )
		.catch( ( error ) => dispatch( { type: UPDATE_WARESLIDER_ERR } ));

	}
}

export const removeWareSlider = ( _id ) => {
	return ( dispatch ) => {
    dispatch( { type: WARESLIDER_LOAD } )
		return axios.post( `${ RU }/wareSlider/remove`, { _id }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
			return dispatch( { type: REMOVE_WARESLIDER, payload: _id } );
		} ).catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } );
		} );

	}
}

export const wareSliderUploadPic = ({ file }) => {
	return ( dispatch ) => {
    dispatch({type: WARESLIDER_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		let config = {
			onUploadProgress: ( progressEvent ) => { let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) },
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/upload`, data, config )
			.then(resp => {
				dispatch(change('AddWareSliderModal', 'picRef', resp.data._id))
				dispatch(change('AddWareSliderModal', 'pic', resp.data.name))
				return dispatch( { type: WARESLIDER_ADD_PIC, payload: resp.data } )
			}).catch(error => {
			})

	}
}

export const wareSliderChangePic = ({ file, id }) => {
	return ( dispatch ) => {
    dispatch({type: WARESLIDER_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		data.append( 'id', id )
		let config = {
			onUploadProgress: ( progressEvent ) => { let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) }, 
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/change/wareSlider/pic`, data, config )
			.then(resp =>  dispatch( { type: UPDATE_WARESLIDER, payload: resp.data.wareSlider } ))
			.catch(error =>  dispatch( { type: UPDATE_WARESLIDER_ERR, payload: error } ))
	}
}
