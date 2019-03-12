import { GET_CENTERS, ADD_CENTER, REMOVE_CENTER, CENTERS_LOAD, YOUR_CENTER,
	CLEAN_CENTERS, GET_CENTERS_COUNT_LOAD, GET_CENTERS_COUNT, GET_CENTERS_COUNT_ERR,
	CENTER_PIC_LOAD, CENTER_PIC_LOAD_DONE, CENTER_ADD_PIC, PIC_UPLOAD_PERCENT, CLEAN_PIC_UPLOAD_PERCENT, PICS_UPLOADED,
	CENTER_UPDATE,  SET_CENTER_TO_POPUP, SET_POPUP_TO_NULL} from '../actions/types'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let centerDef = { centerLoading: false, picLoading: false, error: '', centers: [], yourCenter: { }, formPic: { _id: null, name: null }, reachEnd: false, picUpPercent: [], picsUploaded: [], popup: null, countLoading: false, centersCount: null, errors: { countErr: null } }

export default function (state = centerDef, action) {
	switch (action.type) {
		case CENTERS_LOAD: return { ...state, centerLoading: true, }
		
		case GET_CENTERS_COUNT_LOAD: return { ...state, countLoading: true, }
		case GET_CENTERS_COUNT: return { ...state, countLoading: false, centersCount: action.payload }
		case GET_CENTERS_COUNT_ERR: return { ...state, countLoading: false, errors: { ...state.errors, countErr: 'مشکلی در دریافت تعداد مراکز به وجود آمده است' } }
		
		case CENTER_PIC_LOAD: return { ...state, picLoading: true, formPic: { _id: null, name: null } }
		case CENTER_PIC_LOAD_DONE: return { ...state, picLoading: false }
		case CENTER_ADD_PIC: return { ...state, picLoading: false, formPic: action.payload }
		case SET_CENTER_TO_POPUP: return { ...state, popup: action.payload }
		case SET_POPUP_TO_NULL: return { ...state, popup: null }
		case GET_CENTERS:
			let end = false;
			if (action.payload.length < 29) { end = true }
			return { ...state, centerLoading: false, centers: [...state.centers, ...action.payload], reachEnd: end }
		case CLEAN_CENTERS: return { ...state, centerLoading: false, centers: [] }
		case ADD_CENTER: return { ...state, centerLoading: false, centers: [ action.payload, ...state.centers ] }
		case REMOVE_CENTER:
			let centers = state.centers.filter(center => center._id !== action.payload);
      return { ...state, centerLoading: false, centers: centers }
		case YOUR_CENTER: return { ...state, centerLoading: false, yourCenter: { ...action.payload } }
		case CENTER_UPDATE:
			let index = _.findIndex(state.centers, {_id: action.payload._id});
			const imutcenters = immutableSplice(state.centers, index, 1, action.payload)
			return { ...state, centerLoading: false, picLoading: false, centers: imutcenters }
		case PIC_UPLOAD_PERCENT:
			const iI = _.findIndex(state.picUpPercent, {i: action.payload.i});
			const imutPercent = immutableSplice(state.picUpPercent, iI, 1, action.payload)
			return { ...state, picUpPercent: imutPercent }
		case CLEAN_PIC_UPLOAD_PERCENT: return { ...state, picUpPercent: [], picsUploaded: [] }
		case PICS_UPLOADED: return { ...state, picsUploaded: [...state.picsUploaded, {_id: action.payload._id, name: action.payload.name }] }
		default: return state;
	}
}
