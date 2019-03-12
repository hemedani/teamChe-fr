import { 
	GET_RATE, GET_NEXT_RATE, RATE_LOAD, CLEAN_RATE, GET_YOUR_RATE, SET_EXPERT_RATE_LOADING, 
	SET_EXPERT_RATE_SET, ACCEPTED_RATE, ACCEPT_RATE_LOAD, 
	DENIED_RATE, WARE_RATE_LOAD, GET_WARE_RATE, TEXT_RATE_LOAD,
	CHANGE_WARE_RATE_LOADING, CHANGE_YOUR_WARE_RATE,
	SET_REPLY_LOAD, SET_REPLY, SET_REPLY_ERR,
	CLEAN_WARE_RATES, CLEAN_YOUR_WARE_RATE, UP_RATE_IN_RATES } from '../actions/types'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let rateDef = { rateLoading: false, textRateLoading: false, reachEnd: false, wareRateLoading: false, reachWareEnd: false, error: '', yourRate: {}, 
	rates: [], wareRates: [], expertRates: [
	{rate: 'A'}, {rate: 'B'}, {rate: 'C'}, {rate: 'D'}, {rate: 'E'}
], experRateLoading: false, acceptRateLoading: '', setWareRateLoading: false, yourWareRate: {},
	loaders: { replyLoader: false }, errs: { replyErr: '' }
	}

export default function (state = rateDef, action) {
	switch (action.type) {
		case RATE_LOAD: return { ...state, rateLoading: true }
		case TEXT_RATE_LOAD: return { ...state, textRateLoading: true }
		case WARE_RATE_LOAD: return { ...state, wareRateLoading: true }
		case SET_EXPERT_RATE_LOADING: return { ...state, experRateLoading: true }
		case CHANGE_WARE_RATE_LOADING: return { ...state, setWareRateLoading: true }
		case CHANGE_YOUR_WARE_RATE:
			let wareRate = action.payload || {};
			return { ...state, setWareRateLoading: false, yourWareRate: wareRate }
		case SET_EXPERT_RATE_SET: return { ...state, experRateLoading: false }
		case ACCEPT_RATE_LOAD: return { ...state, acceptRateLoading: action.payload }
		case ACCEPTED_RATE:
			let ratesAcc = state.rates.filter(rate => rate._id !== action.payload._id);
			return { ...state, acceptRateLoading: '', rates: ratesAcc}
	
		case SET_REPLY_LOAD: return { ...state, loaders: { ...state.loaders, replyLoader: true } }	
		case SET_REPLY_ERR: return { ...state, errs: { ...state.errs, replyErr: action.payload }, loaders: { ...state.loaders, replyLoader: false } }	
		case SET_REPLY:
			let rateWithoutReply = state.rates.filter(rate => rate._id !== action.payload._id);
			return { ...state, errs: { ...state.errs, replyErr: '' }, loaders: { ...state.loaders, replyLoader: false }, rates: rateWithoutReply}
		
		case DENIED_RATE:
			let ratesDeny = state.rates.filter(rate => rate._id !== action.payload._id);
			return { ...state, acceptRateLoading: '', rates: ratesDeny}
		case GET_RATE:
			let rEnd = false;
			if (action.payload.length < 29) { rEnd = true }
			return { ...state, rateLoading: false, rates: [...state.rates, ...action.payload], reachEnd: rEnd }
		case GET_NEXT_RATE:
			let end = false;
			if (action.payload.length < 29) { end = true }
			return { ...state, rateLoading: false, rates: [...state.rates, ...action.payload], reachEnd: end }
		case UP_RATE_IN_RATES:
			let index = _.findIndex(state.rates, {_id: action.payload._id});
			const imutrates = immutableSplice(state.rates, index, 1, action.payload)
			return { ...state, rateLoading: false, rates: imutrates }
		case GET_WARE_RATE:
			let wareEnd = false;
			if (action.payload.length < 29) { wareEnd = true }
			return { ...state, wareRateLoading: false, wareRates: [...state.wareRates, ...action.payload], reachWareEnd: wareEnd }
		case GET_YOUR_RATE:
			let rate = action.payload || {};
			return { ...state, textRateLoading: false, rateLoading: false, yourRate: rate }
		case CLEAN_WARE_RATES: return { ...state, wareRateLoading: false, wareRates: [], reachWareEnd: false }
		case CLEAN_YOUR_WARE_RATE: return { ...state, setWareRateLoading: false, yourWareRate: {} }
		case CLEAN_RATE:
			return rateDef
		default:
			return state;
	}
}
