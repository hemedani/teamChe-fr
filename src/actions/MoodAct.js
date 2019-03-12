import axios from 'axios'
import { change } from 'redux-form'
import { GET_MOODS, GET_MOODS_ERR, ADD_MOOD, REMOVE_MOOD, MOOD_LOAD, 
	ADD_MOOD_ERR, MOOD_PIC_LOAD, MOOD_ADD_PIC, UPDATE_MOOD,
	MOOD_UPDATE_LOAD, UPDATE_MOOD_ERR, RU } from './types'
import { toastr } from 'react-redux-toastr'

export const getMoods = () => {
	return ( dispatch ) => {
    dispatch( { type: MOOD_LOAD } )
		return axios.get( `${ RU }/moods`, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: GET_MOODS, payload: resp.data.moods } ))
			.catch( ( e ) => dispatch( { type: GET_MOODS_ERR } ))
	}
}

export const addMood = ( { name, enName, pic, picRef } ) => {
	return ( dispatch ) => {
    dispatch( { type: MOOD_LOAD } )
		return axios.post( `${ RU }/mood/add`, { name, enName, pic, picRef }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => dispatch( { type: ADD_MOOD, payload: resp.data.mood } ))
		.catch( ( error ) => dispatch( { type: ADD_MOOD_ERR } ));

	}
}

export const updateMood = ( { _id, name, enName } ) => {
	return ( dispatch ) => {
    dispatch( { type: MOOD_UPDATE_LOAD } )
		return axios.post( `${ RU }/mood/update`, { _id, name, enName }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
	    return dispatch( { type: UPDATE_MOOD, payload: resp.data.mood } );
		} )
		.catch( ( error ) => dispatch( { type: UPDATE_MOOD_ERR } ));

	}
}

export const removeMood = ( _id ) => {
	return ( dispatch ) => {
    dispatch( { type: MOOD_LOAD } )
		return axios.post( `${ RU }/mood/remove`, { _id }, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
			return dispatch( { type: REMOVE_MOOD, payload: _id } );
		} ).catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } );
		} );

	}
}

export const moodUploadPic = ({ file }) => {
	return ( dispatch ) => {
    dispatch({type: MOOD_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		let config = {
			onUploadProgress: ( progressEvent ) => { let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) },
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/upload`, data, config )
			.then(resp => {
				dispatch(change('AddMoodModal', 'picRef', resp.data._id))
				dispatch(change('AddMoodModal', 'pic', resp.data.name))
				return dispatch( { type: MOOD_ADD_PIC, payload: resp.data } )
			}).catch(error => {
			})

	}
}

export const moodChangePic = ({ file, id }) => {
	return ( dispatch ) => {
    dispatch({type: MOOD_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		data.append( 'id', id )
		let config = {
			onUploadProgress: ( progressEvent ) => { let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) }, 
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/change/mood/pic`, data, config )
			.then(resp =>  dispatch( { type: UPDATE_MOOD, payload: resp.data.mood } ))
			.catch(error =>  dispatch( { type: UPDATE_MOOD_ERR, payload: error } ))
	}
}
