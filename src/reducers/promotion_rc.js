import { GET_PROMOTIONS, ADD_PROMOTION, REMOVE_PROMOTION, PROMOTION_LOAD, YOUR_PROMOTION, CLEAN_PROMOTION, 
	PROMOTION_PIC_LOAD, PROMOTION_ADD_PIC, UPDATE_PROMOTION } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let promotionDef = { promotionLoading: false, picLoading: false, error: '', promotions: [], yourType: {}, formPic: { _id: null, name: null } }

export default (state = promotionDef, action) => {
	switch (action.type) {
		case PROMOTION_LOAD: return { ...state, promotionLoading: true, }
		case PROMOTION_PIC_LOAD: return { ...state, picLoading: true, formPic: { _id: null, name: null } }
		case PROMOTION_ADD_PIC: return { ...state, picLoading: false, formPic: action.payload }
		case GET_PROMOTIONS: return { ...state, promotionLoading: false, promotions: action.payload }
		case CLEAN_PROMOTION: return { ...state, promotionLoading: false, promotions: [] }
		case ADD_PROMOTION: return { ...state, promotionLoading: false, promotions: [ ...state.promotions, action.payload ] }
		case REMOVE_PROMOTION:
			let promotions = state.promotions.filter(promotion => promotion._id !== action.payload);
      return { ...state, promotionLoading: false, promotions: promotions }
		case YOUR_PROMOTION: return { ...state, promotionLoading: false, yourType: { ...action.payload } }
		case UPDATE_PROMOTION:
			let index = _.findIndex(state.promotions, {_id: action.payload._id});
			const imutPromotions = immutableSplice(state.promotions, index, 1, action.payload)
      return { ...state, promotionLoading: false, promotions: imutPromotions }
		default: return state;
	}
}
