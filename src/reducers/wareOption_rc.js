import { GET_WARE_OPTIONS, ADD_WARE_OPTION, REMOVE_WARE_OPTION, WARE_OPTION_LOAD, YOUR_WARE_OPTION, CLEAN_WARE_OPTION, 
	WARE_OPTION_PIC_LOAD, WARE_OPTION_ADD_PIC, UPDATE_WARE_OPTION } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let wareOptionDef = { wareOptionLoading: false, picLoading: false, error: '', wareOptions: [], yourType: {}, formPic: { _id: null, name: null } }

export default function (state = wareOptionDef, action) {
	switch (action.type) {
		case WARE_OPTION_LOAD:
			return { ...state, wareOptionLoading: true, }
		case WARE_OPTION_PIC_LOAD:
			return { ...state, picLoading: true, formPic: { _id: null, name: null } }
		case WARE_OPTION_ADD_PIC:
			return { ...state, picLoading: false, formPic: action.payload }
		case GET_WARE_OPTIONS:
			return { ...state, wareOptionLoading: false, wareOptions: action.payload }
		case CLEAN_WARE_OPTION:
			return { ...state, wareOptionLoading: false, wareOptions: [] }
		case ADD_WARE_OPTION:
			return { ...state, wareOptionLoading: false, wareOptions: [ ...state.wareOptions, action.payload ] }
		case REMOVE_WARE_OPTION:
			let wareOptions = state.wareOptions.filter(wareOption => wareOption._id !== action.payload);
      return { ...state, wareOptionLoading: false, wareOptions: wareOptions }
		case YOUR_WARE_OPTION:
      return { ...state, wareOptionLoading: false, yourType: { ...action.payload } }
		case UPDATE_WARE_OPTION:
			let index = _.findIndex(state.wareOptions, {_id: action.payload._id});
			const imutWareOptions = immutableSplice(state.wareOptions, index, 1, action.payload)
      return { ...state, wareOptionLoading: false, wareOptions: imutWareOptions }
		default:
			return state;
	}
}
