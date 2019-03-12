import { GET_DELIVERIES, ADD_DELIVERY, REMOVE_DELIVERY, DELIVERY_LOAD, CLEAN_DELIVERY, DELIVERY_PIC_LOAD, DELIVERY_ADD_PIC, UPDATE_DELIVERY, DELIVERY_UPDATE_LOAD } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let defaultState = { deliveryLoading: false, picLoading: false, error: '', deliveries: [], loaders: {
	updateLoader: false
} }

export default (state = defaultState, action) => {
	switch (action.type) {

		// Loaders 
		case DELIVERY_UPDATE_LOAD: return { ...state, loaders: { ...state.loaders, updateLoader: true } }
		case DELIVERY_LOAD: return { ...state, deliveryLoading: true, }
		case DELIVERY_PIC_LOAD: return { ...state, picLoading: true }
		
		case DELIVERY_ADD_PIC: return { ...state, picLoading: false }
		case GET_DELIVERIES: return { ...state, deliveryLoading: false, deliveries: action.payload }
		case CLEAN_DELIVERY: return { ...state, deliveryLoading: false, deliveries: [] }
		
		case ADD_DELIVERY: 
			return { ...state, deliveryLoading: false, deliveries: [ ...state.deliveries, action.payload ] }
		case REMOVE_DELIVERY:
			let deliveries = state.deliveries.filter(delivery => delivery._id !== action.payload);
      return { ...state, deliveryLoading: false, deliveries: deliveries }
		case UPDATE_DELIVERY:
			let index = _.findIndex(state.deliveries, {_id: action.payload._id});
			const imutdeliveries = immutableSplice(state.deliveries, index, 1, action.payload)
			return { ...state, deliveryLoading: false, deliveries: imutdeliveries, loaders: { ...state.loaders, updateLoader: false } }
		default: return state;
	}
}
