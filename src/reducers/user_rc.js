import { GET_USERS_LOAD, GET_USERS, CLEAN_USERS, REMOVE_USER, 
	REGISTER_USER, UPDATE_USER, UPDATE_USER_ERR, USER_UPDATE_LOAD,
	GET_USERS_COUNT_LOAD, GET_USERS_COUNT, GET_USERS_COUNT_ERR,
	ADD_USER, ADD_USER_LOAD, ADD_USER_ERR } from '../actions/types'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let userDef = { userLoading: true, error: '', users: [], userUpdating: false, countLoading: false, usersCount: null, errors: { countErr: null } }

export default function (state = userDef, action) {
	switch (action.type) {
		case GET_USERS_LOAD: return {...state, userLoading: true }
		case USER_UPDATE_LOAD: return {...state, userUpdating: true }
				
		case GET_USERS_COUNT_LOAD: return { ...state, countLoading: true, }
		case GET_USERS_COUNT: return { ...state, countLoading: false, usersCount: action.payload }
		case GET_USERS_COUNT_ERR: return { ...state, countLoading: false, errors: { ...state.errors, countErr: 'مشکلی در دریافت تعداد کاربرها به وجود آمده است' } }

		case UPDATE_USER:
			let index = _.findIndex(state.users, {_id: action.payload._id});
			const imutusers = immutableSplice(state.users, index, 1, action.payload)
      return { ...state, rasteLoading: false, users: imutusers }
		case GET_USERS: return {...state, userLoading: false, users: [ ...state.users, ...action.payload ] }
		case ADD_USER: return {...state, users: [ action.payload, ...state.users ] }
		case CLEAN_USERS: return {...state, users: [] }
		case REMOVE_USER:
			let usersWithoutRemove = state.users.filter(user => user._id !== action.payload._id)
			return {...state, userLoading: false, users: usersWithoutRemove }
		case REGISTER_USER:
			let usersWithRegister = [ action.payload, ...state.users ]
			return {...state, userLoading: false, users: usersWithRegister }
		default: return state;
	}
}
