import { 
	GET_WARE, GET_WARES, ADD_WARE, REMOVE_WARE, WARE_LOAD, 
	WARE_NP_LOAD, SELECTED_WARE, CLEAN_WARE, WARE_PIC_LOAD, WARE_ADD_LOAD,
	GET_RECOMAND_TYPE, GET_RECOMAND_CENTER, GET_RECOMAND_TYPE_LOAD, GET_RECOMAND_CENTER_LOAD, CLEAR_QUERY_WARE, GET_RECOMAND_MOOD, GET_RECOMAND_MOOD_LOAD,
	LAST_WARE, FIRST_WARE, WARE_ADD_PIC, CLEAN_SELECTED_WARE, UPDATE_WARE, UPDATE_WARE_ERR, WARE_UPDATE_LOAD } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let wareDef = { wareLoading: false, picLoading: false, error: '', wares: [], recomandCenter: [], recomandType: [], recomandMood: [], selected: {}, formPic: { _id: null, name: null },
	loaders: { recTypeLoad: false, recCenterLoad: false, recMoodLoad: false, updateWareLoad: false },
 	richLast: false, richFirst: false, wareNpLoad: false, wareAddLoad: false	}

export default function (state = wareDef, action) {
	switch (action.type) {
		case WARE_LOAD:
			return { ...state, wareLoading: true, }
		case WARE_ADD_LOAD:
			return { ...state, wareAddLoad: true, }
		case WARE_NP_LOAD:
			return { ...state, wareNpLoad: true, }
		case WARE_PIC_LOAD:
			return { ...state, picLoading: true, formPic: { _id: null, name: null } }
		case WARE_ADD_PIC:
			return { ...state, picLoading: false, formPic: action.payload }
		case GET_WARES:
			return { ...state, wareLoading: false, wares: action.payload }
		case CLEAN_WARE:
			return { ...state, wareLoading: false, wares: [] }
		case ADD_WARE:
			return { ...state, wareAddLoad: false, wares: [ ...state.wares, action.payload ] }
		case REMOVE_WARE:
			let wares = state.wares.filter(ware => ware._id !== action.payload._id)
			return { ...state, wareLoading: false, wares: wares }

		
		case WARE_UPDATE_LOAD:
			return { ...state, loaders: {...state.loaders, updateWareLoad: true }, }

		case UPDATE_WARE:
			let index = _.findIndex(state.wares, {_id: action.payload._id});
			const imutWare = immutableSplice(state.wares, index, 1, action.payload)
			return { ...state, updateWareLoad: false, wares: imutWare }
		
		case SELECTED_WARE:
			return { ...state, wareLoading: false, wareNpLoad: false, selected: action.payload, richLast: false, richFirst: false }
		case CLEAN_SELECTED_WARE:
			return { ...state, wareLoading: false, wareNpLoad: false, selected: {}, richLast: false, richFirst: false }
		case LAST_WARE:
			return { ...state, wareLoading: false, wareNpLoad: false, richLast: true }
		case FIRST_WARE:
			return { ...state, wareLoading: false, wareNpLoad: false, richFirst: true }
		case GET_RECOMAND_TYPE_LOAD: 
			return { ...state, loaders: { ...state.loaders, recTypeLoad: true } }
		case GET_RECOMAND_CENTER_LOAD: 
			return { ...state, loaders: { ...state.loaders, recCenterLoad: true } }
		case GET_RECOMAND_MOOD_LOAD: 
			return { ...state, loaders: { ...state.loaders, recMoodLoad: true  } }
		case GET_RECOMAND_TYPE: 
			return { ...state, loaders: { ...state.loaders, recTypeLoad: false,  }, recomandType: action.payload }
		case GET_RECOMAND_CENTER: 
			return { ...state, loaders: { ...state.loaders, recCenterLoad: false,  }, recomandCenter: action.payload }
		case GET_RECOMAND_MOOD: 
			return { ...state, loaders: { ...state.loaders, recMoodLoad: false,  }, recomandMood: action.payload }
		case CLEAR_QUERY_WARE: 
			return { ...state, loaders: { ...state.loaders, recCenterLoad: false, recTypeLoad: false, recMoodLoad: false }, recomandCenter: [], recomandType: [], recomandMood: []}
		default: return state;
	}
}
