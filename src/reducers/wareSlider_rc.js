import { GET_WARESLIDERS, ADD_WARESLIDER, REMOVE_WARESLIDER, WARESLIDER_LOAD, YOUR_WARESLIDER, CLEAN_WARESLIDER, 
	WARESLIDER_PIC_LOAD, WARESLIDER_ADD_PIC, UPDATE_WARESLIDER } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let wareSliderDef = { wareSliderLoading: false, picLoading: false, error: '', wareSliders: [], yourType: {}, formPic: { _id: null, name: null } }

export default (state = wareSliderDef, action) => {
	switch (action.type) {
		case WARESLIDER_LOAD: return { ...state, wareSliderLoading: true, }
		case WARESLIDER_PIC_LOAD: return { ...state, picLoading: true, formPic: { _id: null, name: null } }
		case WARESLIDER_ADD_PIC: return { ...state, picLoading: false, formPic: action.payload }
		case GET_WARESLIDERS: return { ...state, wareSliderLoading: false, wareSliders: action.payload }
		case CLEAN_WARESLIDER: return { ...state, wareSliderLoading: false, wareSliders: [] }
		case ADD_WARESLIDER: return { ...state, wareSliderLoading: false, wareSliders: [ ...state.wareSliders, action.payload ] }
		case REMOVE_WARESLIDER:
			let wareSliders = state.wareSliders.filter(wareSlider => wareSlider._id !== action.payload);
      return { ...state, wareSliderLoading: false, wareSliders: wareSliders }
		case YOUR_WARESLIDER: return { ...state, wareSliderLoading: false, yourType: { ...action.payload } }
		case UPDATE_WARESLIDER:
			let index = _.findIndex(state.wareSliders, {_id: action.payload._id});
			const imutMoods = immutableSplice(state.wareSliders, index, 1, action.payload)
      return { ...state, wareSliderLoading: false, wareSliders: imutMoods }
		default: return state;
	}
}
