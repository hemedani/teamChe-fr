import axios from 'axios'
import { UPDATE_USER, USER_PIC_LOAD, 
	REMOVE_USER, GET_USERS, GET_USERS_ERR, GET_USERS_LOAD, CLEAN_USERS,
	ADD_USER, ADD_USER_LOAD, ADD_USER_ERR, GET_OWN_USER_LOAD, GET_OWN_USERS, 
	ADD_ADDRESS_TO_USER_LOAD, UPDATE_USER_ADDRESS,
	SHOW_ADD_ADDRESS_MODAL, HIDE_ADD_ADDRESS_MODAL,
	REMOVE_USER_ADDRESS_LOAD,
	GET_USERS_COUNT_LOAD, GET_USERS_COUNT, GET_USERS_COUNT_ERR,
	UPDATE_USER_ERR, USER_UPDATE_LOAD, RU } from './types'

export function removeUser({ _id }) {
	return function ( dispatch ) {
		dispatch({ type: GET_USERS_LOAD })
		return axios.post(`${ RU }/user/remove`, { _id }, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then(resp => dispatch({ type: REMOVE_USER, payload: resp.data.user }))
			.catch(( error ) => error)
	}
}

export function userChangePic({ file, id }) {
	return function ( dispatch ) {
    dispatch({type: USER_UPDATE_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		data.append( 'id', id )
		let config = {
			onUploadProgress: function ( progressEvent ) {
				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
			}, headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/change/user/pic`, data, config )
			.then(resp => dispatch( { type: UPDATE_USER, payload: resp.data.user } ))
			.catch(error => dispatch( { type: UPDATE_USER_ERR, payload: error } ))

	}
}

export function getUsers( id ) {
	id = id || null
	return function ( dispatch ) {
    dispatch({type: GET_USERS_LOAD })
		if (id === null || id === false || id === undefined) { dispatch({type: CLEAN_USERS }) }
		return axios.get(`${ RU }/users`, { params: { id: id }, headers: { sabti: localStorage.getItem( 'token' ) }
		})
		.then(resp => dispatch({ type: GET_USERS, payload: resp.data.users }))
		.catch(( e ) => { return e.response })
	}
}

export const getOwnUser = () => {
	return ( dispatch ) => {
    dispatch({type: GET_OWN_USER_LOAD })
		return axios.get(`${ RU }/user/getown`, { headers: { sabti: localStorage.getItem( 'token' ) }
		})
		.then(resp => dispatch({ type: GET_OWN_USERS, payload: resp.data.user }))
		.catch(( e ) => { return e.response })
	}

}

export function getUsersWithQuery( { email, familyName, phone } ) {
	return function ( dispatch ) {
    dispatch({type: GET_USERS_LOAD })
		dispatch({type: CLEAN_USERS })
		return axios.post(`${ RU }/users/withsearch`, { email, familyName, phone }, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then(resp => {
				return dispatch({ type: GET_USERS, payload: resp.data.users })
			})
			.catch(( e ) => {
				return e.response
			})
	}
}

export function getDoctorUser() {
	return function ( dispatch ) {
    dispatch({type: GET_USERS_LOAD })
		dispatch({type: CLEAN_USERS })
		return axios.get(`${ RU }/users/get/doctor`, { headers: { sabti: localStorage.getItem( 'token' ) } })
			.then(resp => dispatch({ type: GET_USERS, payload: resp.data.users }))
			.catch(( e ) => dispatch( { type: GET_USERS_ERR } ))
	}
}

export function getUserWithLevel( level ) {
	return function ( dispatch ) {
    dispatch({type: GET_USERS_LOAD })
		dispatch({type: CLEAN_USERS })
		return axios.get(`${ RU }/users/withlevel`, { params: { level }, headers: { sabti: localStorage.getItem( 'token' ) } })
		.then(resp => {
			return dispatch({ type: GET_USERS, payload: resp.data.users })
		})
		.catch(( e ) => {
			return e.response
		})
	}
}

export const updateUser = ( { _id, name, familyName, expertise, address, doctor, level } ) => {
	return ( dispatch ) => {
    dispatch( { type: USER_UPDATE_LOAD } )
		return axios.post( `${ RU }/user/edit`, { _id, name, familyName, expertise, address, doctor, level }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => dispatch( { type: UPDATE_USER, payload: resp.data.user } ))
		.catch( ( error ) =>  dispatch( { type: UPDATE_USER_ERR } ) );
	}
}

export const changeUserPass = ( pass ) => {
	return ( dispatch ) => {
    dispatch( { type: USER_UPDATE_LOAD } )
		return axios.post( `${ RU }/user/edit/pass`, pass, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => dispatch( { type: UPDATE_USER, payload: resp.data.user } ))
		.catch( ( error ) =>  dispatch( { type: UPDATE_USER_ERR } ) );
	}
}

export const addUser = ( user ) => {
	return ( dispatch ) => {
    dispatch( { type: ADD_USER_LOAD } )
		return axios.post( `${ RU }/user/add`, user, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => dispatch( { type: ADD_USER, payload: resp.data.user } ))
		.catch( ( error ) =>  dispatch( { type: ADD_USER_ERR } ) );
	}
}

export const addAddressToUser = (Address) => {
	return ( dispatch ) => {
    dispatch({type: ADD_ADDRESS_TO_USER_LOAD })
		return axios.post(`${ RU }/user/add/address`, Address, { headers: { sabti: localStorage.getItem( 'token' ) }
		})
		.then(resp => {
			resp.data.user && localStorage.setItem( 'user', JSON.stringify(resp.data.user) )
			return dispatch({ type: UPDATE_USER_ADDRESS, payload: resp.data.user })})
		.catch(( e ) => { return e.response })
	}
}

export const removeUserAddress = (_id) => {
	return ( dispatch ) => {
    dispatch({type: REMOVE_USER_ADDRESS_LOAD })
		return axios.post(`${ RU }/user/remove/address`, { _id }, { headers: { sabti: localStorage.getItem( 'token' ) }
		})
		.then(resp => dispatch({ type: UPDATE_USER_ADDRESS, payload: resp.data.user }))
		.catch(( e ) => { return e.response })
	}
}

export const GetUsersCount = ( ) => {
	return ( dispatch ) => {
    dispatch( { type: GET_USERS_COUNT_LOAD } )
		return axios.get( `${ RU }/user/get/count`, { headers: { sabti: localStorage.getItem( 'token' ) } } )
		.then( resp => dispatch( { type: GET_USERS_COUNT, payload: resp.data.UsersCount } ))
		.catch( ( error ) =>  dispatch( { type: GET_USERS_COUNT_ERR, payload: error } ) );
	}
}

export const showAddAddressModal = () => ({type: SHOW_ADD_ADDRESS_MODAL})
export const hideAddAddressModal = () => ({type: HIDE_ADD_ADDRESS_MODAL})

// -------- Ina baraye in bood ke befaham chejori mishe err chach ro gereft -----
// console.log('error', error)
// console.log('errorType', typeof error)
// console.log('error', Object.assign({}, error))
// console.log('getOwnPropertyNames', Object.getOwnPropertyNames(error))
// console.log('Akey', error.response.data.error)
// -----------------------------------------------------------------------
