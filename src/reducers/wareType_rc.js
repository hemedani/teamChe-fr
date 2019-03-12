import { GET_WARE_TYPES, ADD_WARE_TYPE, REMOVE_WARE_TYPE, WARE_TYPE_LOAD, YOUR_WARE_TYPE, CLEAN_WARE_TYPE, WARE_TYPE_PIC_LOAD, 
	WARE_TYPE_ADD_PIC, WARE_TYPE_UPDATE } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let wareTypeDef = { wareTypeLoading: false, picLoading: false, error: '', wareTypes: [], yourType: {} }

export default function (state = wareTypeDef, action) {
	switch (action.type) {
		case WARE_TYPE_LOAD:
			return { ...state, wareTypeLoading: true, }
		case WARE_TYPE_PIC_LOAD:
			return { ...state, picLoading: true }
		case WARE_TYPE_ADD_PIC:
			return { ...state, picLoading: false }
		case GET_WARE_TYPES:
			return { ...state, wareTypeLoading: false, wareTypes: action.payload }
		case CLEAN_WARE_TYPE:
			return { ...state, wareTypeLoading: false, wareTypes: [] }
		case ADD_WARE_TYPE:
			return { ...state, wareTypeLoading: false, wareTypes: [ ...state.wareTypes, action.payload ] }
		case REMOVE_WARE_TYPE:
			let wareTypes = state.wareTypes.filter(wareType => wareType._id !== action.payload);
      return { ...state, wareTypeLoading: false, wareTypes: wareTypes }
		case YOUR_WARE_TYPE:
      return { ...state, wareTypeLoading: false, yourType: { ...action.payload } }
		case WARE_TYPE_UPDATE:
			let index = _.findIndex(state.wareTypes, {_id: action.payload._id});
			const imutWareTypes = immutableSplice(state.wareTypes, index, 1, action.payload)
			return { ...state, picLoading: false, wareTypes: imutWareTypes }
		default:
			return state;
	}
}
