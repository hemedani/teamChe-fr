import { ADD_TO_CART, GET_WARES_IN_CART, CLEAN_CART, GET_CART_LOADING, ADD_TO_CART_LOAD, GET_CART, TOGGLE_CART,
	REMOVE_FROM_CART, HIDE_CART, CHANGE_WARE_AMOUNT } from '../actions/types'
import { immutableSplice } from '../components/Utils/Imutable'
import _ from 'lodash';

const cartDef = { _id: null, wares: [], addLoading: false, getLoading: false, toggleCart: false, address: {_id : ''}, sumTotalPrice: 0, finalRegister: false }
export default function (state = cartDef, action) {
	switch (action.type) {
		case ADD_TO_CART_LOAD: return { ...state, addLoading: true };
		case GET_CART_LOADING: return { ...state, getLoading: true };
		case ADD_TO_CART: return { ...state, wares: action.payload.waresArr, addLoading: false, sumTotalPrice: action.payload.sumTotalPrice };
		case REMOVE_FROM_CART: 
			const wares = state.wares.filter(ware => ware._id !== action.payload);
			return { ...state, wares: wares, addLoading: false };
		case GET_CART: return { ...state, _id: action.payload._id, wares: action.payload.waresArr, getLoading: false, address: action.payload.address, sumTotalPrice: action.payload.sumTotalPrice, finalRegister: action.payload.finalRegister };
		case TOGGLE_CART: return {  ...state, toggleCart: !state.toggleCart };
		case HIDE_CART: return {  ...state, toggleCart: false };

		case CHANGE_WARE_AMOUNT :
			let wareFind = _.find(state.wares, {_id: action.payload._id});
			let sumTotalPrice = state.sumTotalPrice;

			wareFind.amount = parseInt(action.payload.amount)
			sumTotalPrice = (sumTotalPrice - wareFind.totalPrice) + (parseInt(action.payload.amount) * parseInt(wareFind.price));
			wareFind.totalPrice = (parseInt(action.payload.amount) * parseInt(wareFind.price))

			const index = _.findIndex(state.wares, {_id: action.payload._id});
			const immutWares = immutableSplice(state.wares, index, 1, wareFind)
			return { ...state, sumTotalPrice, wares: immutWares }
		case CLEAN_CART: return cartDef;
		default: return state;
	}
}
