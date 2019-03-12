import { REGISTER_PURCHASE, GET_PURCHASE, SET_FOR_PAID, SEND_COST_TO_ZARINPAL_LOAD } from '../actions/types'

const purchase = { purchases: [], forPaid: {}, purchaseLoaders: { sendToZarin: false } }

export default (state = purchase, action) => {
	switch (action.type) {
		case REGISTER_PURCHASE: return { ...state, purchases : [ ...state.purchases, action.payload ], forPaid: action.payload }
		case GET_PURCHASE: return { ...state, purchases : action.payload }
		case SET_FOR_PAID: return { ...state, forPaid : action.payload, purchaseLoaders : { ...state.purchaseLoaders, sendToZarin: false } }
		case SEND_COST_TO_ZARINPAL_LOAD: return { ...state, purchaseLoaders : { ...state.purchaseLoaders, sendToZarin: true } }
		default: return state;
	}
}
