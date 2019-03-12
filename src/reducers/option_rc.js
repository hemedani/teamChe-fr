import { GET_OPTIONS, ADD_OPTION, REMOVE_OPTION, OPTION_LOAD, YOUR_OPTION, CLEAN_OPTION, OPTION_PIC_LOAD, OPTION_ADD_PIC, UPDATE_OPTION } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let optionDef = { optionLoading: false, picLoading: false, error: '', options: [], yourOption: {}, formPic: { _id: null, name: null } }

export default function (state = optionDef, action) {
	switch (action.type) {
		case OPTION_LOAD:
			return { ...state, optionLoading: true, }
		case OPTION_PIC_LOAD:
			return { ...state, picLoading: true, formPic: { _id: null, name: null } }
		case OPTION_ADD_PIC:
			return { ...state, picLoading: false, formPic: action.payload }
		case GET_OPTIONS:
			return { ...state, optionLoading: false, options: action.payload }
		case CLEAN_OPTION:
			return { ...state, optionLoading: false, options: [] }
		case ADD_OPTION:
			return { ...state, optionLoading: false, options: [ ...state.options, action.payload ] }
		case REMOVE_OPTION:
			let options = state.options.filter(option => option._id !== action.payload);
      return { ...state, optionLoading: false, options: options }
		case YOUR_OPTION:
      return { ...state, optionLoading: false, yourOption: { ...action.payload } }
		case UPDATE_OPTION:
			let index = _.findIndex(state.options, {_id: action.payload._id});
			const imutoptions = immutableSplice(state.options, index, 1, action.payload)
			return { ...state, optionLoading: false, options: imutoptions }
		default:
			return state;
	}
}
