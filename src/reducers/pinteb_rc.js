import { SET_BACKGROUND_HEADER, UNSET_BACKGROUND_HEADER, TOGGLE_MOB_NAV, TOGGLE_SEARCH_NAV, HIDE_MOB_NAV, SHOW_GALLERY, HIDE_GALLERY, SET_GALLERY_PICS, ADD_ADDRESS_TO_USER_LOAD, UPDATE_USER_ADDRESS, REGISTER_PURCHASE_LOAD, REGISTER_PURCHASE,
	SHOW_ADD_ADDRESS_MODAL, HIDE_ADD_ADDRESS_MODAL, REGISTER_AGAIN_CART_LOAD, REGISTER_AGAIN_CART,
	REMOVE_CENTER_ODD_ADD_LOADING, REMOVE_CENTER_ODD_ADD_END, GET_OWN_USER_LOAD, GET_OWN_USERS,
	GET_PURCHASE_LOAD, GET_PURCHASE, GET_FOR_PAID_PURCHASE_LOAD, SET_FOR_PAID,
	UPLOAD_PIC_LOAD, ALL_PIC_UPLOADED, PIC_UPLOAD_PERCENT, PICS_UPLOADED, CLEAN_PIC_UPLOAD_PERCENT, 
	RESET_REDIRECT, SET_REDIRECT,
	RU } from '../actions/types'
	import _ from 'lodash'
	import { immutableSplice } from '../components/Utils/Imutable'

let pintebDef = { backHeader: false, mobNavOpen: false, mobSearchOpen: false, showGallery: false, galleryPics: [], loaders: {
	removeCnAdd: false, loadOwnUser: false, addAddressUserLoad: false, registerAgainLoad: false, registerPurchase: false,
	getPurchaseLoading: false, forPaidPurchaseLoad: false, picUpLoading: false, redirectUrl: '',
	}, showHide: {
		addAddressModal: false
	},
	picUpPercent: [], picsUploaded: [], }

export default (state = pintebDef, action) => {
	switch (action.type) {
		case SET_BACKGROUND_HEADER: return { ...state, backHeader: true }
		case UNSET_BACKGROUND_HEADER: return { ...state, backHeader: false }
		case TOGGLE_MOB_NAV: return { ...state, mobNavOpen: !state.mobNavOpen }
		case TOGGLE_SEARCH_NAV: return { ...state, mobSearchOpen: !state.mobSearchOpen }
		case HIDE_MOB_NAV: return { ...state, mobNavOpen: false }
		case SHOW_GALLERY: return { ...state, showGallery: true }
		case HIDE_GALLERY: return { ...state, showGallery: false, galleryPics: [] }
		
		case RESET_REDIRECT: return { ...state, redirectUrl: '' }
		case SET_REDIRECT: return { ...state, redirectUrl: action.payload }
		
		case REMOVE_CENTER_ODD_ADD_LOADING: return { ...state, loaders: { ...state.loaders, removeCnAdd: true } }
		case REMOVE_CENTER_ODD_ADD_END: return { ...state, loaders: { ...state.loaders, removeCnAdd: false } }

		case GET_OWN_USER_LOAD: return { ...state, loaders: { ...state.loaders, loadOwnUser: true } }
		case GET_OWN_USERS: return { ...state, loaders: { ...state.loaders, loadOwnUser: false } }

		case GET_FOR_PAID_PURCHASE_LOAD: return { ...state, loaders: { ...state.loaders, forPaidPurchaseLoad: true } }
		case SET_FOR_PAID: return { ...state, loaders: { ...state.loaders, forPaidPurchaseLoad: false } }

		case GET_PURCHASE_LOAD: return { ...state, loaders: { ...state.loaders, getPurchaseLoading: true } }
		case GET_PURCHASE: return { ...state, loaders: { ...state.loaders, getPurchaseLoading: false } }

		case ADD_ADDRESS_TO_USER_LOAD: return { ...state, loaders: { ...state.loaders, addAddressUserLoad: true } }
		case UPDATE_USER_ADDRESS: return { ...state, loaders: { ...state.loaders, addAddressUserLoad: false } }
		
		case SHOW_ADD_ADDRESS_MODAL: return { ...state, showHide: { ...state.showHide, addAddressModal: true } }
		case HIDE_ADD_ADDRESS_MODAL: return { ...state, showHide: { ...state.showHide, addAddressModal: false } }
		
		case REGISTER_AGAIN_CART_LOAD: return { ...state, loaders: { ...state.loaders, registerAgainLoad: true } }
		case REGISTER_AGAIN_CART: return { ...state, loaders: { ...state.loaders, registerAgainLoad: false } }

		case REGISTER_PURCHASE_LOAD: return { ...state, loaders: { ...state.loaders, registerPurchase: true } }
		case REGISTER_PURCHASE: return { ...state, loaders: { ...state.loaders, registerPurchase: false } }

		case SET_GALLERY_PICS:
			let images = []
			action.payload.map(pic => images.push({ original: `${ RU }/pic/800/${ pic }`, thumbnail:  `${ RU }/pic/240/${ pic }`}))
			return { ...state, galleryPics: images }

		case UPLOAD_PIC_LOAD: return { ...state, loaders: { ...state.loaders, picUpLoading: true } }
		case ALL_PIC_UPLOADED: return { ...state, loaders: { ...state.loaders, picUpLoading: false } }

		case PIC_UPLOAD_PERCENT:
			const iI = _.findIndex(state.picUpPercent, {i: action.payload.i});
			const imutPercent = immutableSplice(state.picUpPercent, iI, 1, action.payload)
			return { ...state, picUpPercent: imutPercent }
		case CLEAN_PIC_UPLOAD_PERCENT: return { ...state, picUpPercent: [], picsUploaded: [] }
		case PICS_UPLOADED: return { ...state, picsUploaded: [...state.picsUploaded, {_id: action.payload._id, name: action.payload.name }] }

		default: return state;
	}
}
