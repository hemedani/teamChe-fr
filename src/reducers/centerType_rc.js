import { GET_CENTER_TYPES, ADD_CENTER_TYPE, REMOVE_CENTER_TYPE, CENTER_TYPE_LOAD, YOUR_CENTER_TYPE, CLEAN_CENTER_TYPE, 
	CENTER_TYPE_PIC_LOAD, CENTER_TYPE_ADD_PIC, UPDATE_CENTER_TYPE } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let rasteDef = { rasteLoading: false, picLoading: false, error: '', rastes: [], yourType: {}, formPic: { _id: null, name: null } }

export default function (state = rasteDef, action) {
	switch (action.type) {
		case CENTER_TYPE_LOAD:
			return { ...state, rasteLoading: true, }
		case CENTER_TYPE_PIC_LOAD:
			return { ...state, picLoading: true, formPic: { _id: null, name: null } }
		case CENTER_TYPE_ADD_PIC:
			return { ...state, picLoading: false, formPic: action.payload }
		case GET_CENTER_TYPES:
			return { ...state, rasteLoading: false, rastes: action.payload }
		case CLEAN_CENTER_TYPE:
			return { ...state, rasteLoading: false, rastes: [] }
		case ADD_CENTER_TYPE:
			return { ...state, rasteLoading: false, rastes: [ ...state.rastes, action.payload ] }
		case REMOVE_CENTER_TYPE:
			let rastes = state.rastes.filter(raste => raste._id !== action.payload);
      return { ...state, rasteLoading: false, rastes: rastes }
		case YOUR_CENTER_TYPE:
      return { ...state, rasteLoading: false, yourType: { ...action.payload } }
		case UPDATE_CENTER_TYPE:
			let index = _.findIndex(state.rastes, {_id: action.payload._id});
			const imutrastes = immutableSplice(state.rastes, index, 1, action.payload)
      return { ...state, rasteLoading: false, rastes: imutrastes }
		default:
			return state;
	}
}
