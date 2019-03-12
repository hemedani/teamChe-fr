import axios from 'axios'
import { 
	GET_STATES, ADD_STATE, REMOVE_STATE, STATE_LOAD, ADD_STATE_ERR, ADD_TOWN_TO_STATE_ERR, ADD_TOWN_TO_STATE, ADD_TOWN_LOAD,
	UPDATE_STATE, UPDATE_STATE_ERR, STATE_UPDATE_LOAD, SHOW_TOWNS, OFF_SHOW_TOWNS, RU } from './types'
	import { toastr } from 'react-redux-toastr'

export const getStates = () => {
	return ( dispatch ) => {
    dispatch( { type: STATE_LOAD } )
		return axios.get( `${ RU }/states`, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			return dispatch( { type: GET_STATES, payload: resp.data.states } )
		} ).catch( ( e ) => {
      // dispatch( { type: KASABE_ERR } )
		} )
	}
}

export const addState = ( state ) => {
	return ( dispatch ) => {
    dispatch( { type: STATE_LOAD } )
		return axios.post( `${ RU }/state/add`, state, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => dispatch( { type: ADD_STATE, payload: resp.data.state } ))
		.catch( ( error ) =>  dispatch( { type: ADD_STATE_ERR, payload: error } ));
	}
}

export const addTownToState = ( town ) => {
	return ( dispatch ) => {
    dispatch( { type: ADD_TOWN_LOAD } )
		return axios.post( `${ RU }/state/add/town`, town, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => dispatch( { type: UPDATE_STATE, payload: resp.data.state } ))
		.catch( ( error ) =>  dispatch( { type: ADD_TOWN_TO_STATE_ERR, payload: error } ));
	}
}

export const updateState = ( state ) => {
	return ( dispatch ) => {
    dispatch( { type: STATE_UPDATE_LOAD } )
		return axios.post( `${ RU }/state/update`, state, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => {
				toastr.info('با تشکر', `استان بروزرسانی شد`)
				return dispatch( { type: UPDATE_STATE, payload: resp.data.state } );
			} )
			.catch( ( err ) => dispatch( { type: UPDATE_STATE_ERR, payload: err } ));

	}
}

export const removeState = ( _id ) => {
	return ( dispatch ) => {
    dispatch( { type: STATE_LOAD } )
		return axios.post( `${ RU }/state/remove`, { _id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
			return dispatch( { type: REMOVE_STATE, payload: _id } );
		} ).catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } );
		} );

	}
}

export const onShowTowns = (_id) => ({ type: SHOW_TOWNS, payload: _id })
export const offShowTowns = () => ({type: OFF_SHOW_TOWNS})
