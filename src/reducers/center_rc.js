import {
	CENTER_LOAD,
	GET_CENTER,
	CLEAN_CENTER,
	CHANGE_QUALITY_RATE,
	CHANGE_QUALITY_LOADING,
	CHANGE_PRICE_RATE,
	CHANGE_PRICE_LOADING,
	CHANGE_SALESMAN_RATE,
	CHANGE_SALESMAN_LOADING,
	LOAD_EDITED_CENTER,
	GET_EDITED_CENTER,
	SET_CENTER_LIKE,
	REMOVE_CENTER_ODD_ADD_END,
	CENTER_UPDATE,
	CENTERS_LOAD
} from '../actions/types'

let centerDef = { centerLoading: true, error: '', center: {location: {coordinates: [54.399883, 32.159084 ]}}, qualityRateLoading: false, priceRateLoading: false, salsmanRateLoading: false, editedCenter: { pic: [], location: {coordinates: [54.399883, 32.159084 ]} }, editedCenterLoading: false }

export default function (state = centerDef, action) {
	switch (action.type) {
		case CENTER_LOAD:
			return { ...state, centerLoading: true }
		case CHANGE_QUALITY_LOADING:
			return { ...state, qualityRateLoading: true }
		case CHANGE_QUALITY_RATE:
			return { ...state, qualityRateLoading: false, center: {...state.center, TotalQualityRate: action.payload.TotalQualityRate }  }
		case CHANGE_PRICE_LOADING:
			return { ...state, priceRateLoading: true }
		case CHANGE_PRICE_RATE:
			return { ...state, priceRateLoading: false, center: {...state.center, TotalPriceRate: action.payload.TotalPriceRate }  }
		case CHANGE_SALESMAN_LOADING:
			return { ...state, salsmanRateLoading: true }
		case CHANGE_SALESMAN_RATE:
			return { ...state, salsmanRateLoading: false, center: {...state.center, TotalSalesmanRate: action.payload.TotalSalesmanRate }  }
		case GET_CENTER:
			return { ...state, centerLoading: false, center: {...state.center, ...action.payload} }
		
		// case REMOVE_CENTER_ODD_ADD_END:
		// 	return { ...state, center: { ...state.center, otherAdresses: action.payload.otherAdresses } }
		
		case SET_CENTER_LIKE:
			return { ...state, centerLoading: false, center: {...state.center, hasLiked: action.payload.hasLiked} }
		
		case LOAD_EDITED_CENTER:
		case CENTERS_LOAD:
			return { ...state, editedCenterLoading: true }
		
		case GET_EDITED_CENTER:
		case CENTER_UPDATE:
			return { ...state, editedCenterLoading: false, editedCenter: action.payload }
		
		// case ADD_WARE:
		// 	return { ...state, center: { ...state.center, wares: [ action.payload, ...state.center.wares ] } }
		case CLEAN_CENTER:
			return centerDef
		default:
			return state;
	}
}
