import axios from 'axios';
import { SET_BACKGROUND_HEADER, UNSET_BACKGROUND_HEADER, TOGGLE_MOB_NAV, HIDE_MOB_NAV, TOGGLE_SEARCH_NAV, SHOW_GALLERY, HIDE_GALLERY, SET_GALLERY_PICS, 
  UPLOAD_PIC_LOAD, PIC_UPLOAD_PERCENT, PICS_UPLOADED, ALL_PIC_UPLOADED, CLEAN_PIC_UPLOAD_PERCENT, RESET_REDIRECT, SET_REDIRECT, RU } from './types';

export const setBackHeader = () => ({ type: SET_BACKGROUND_HEADER })
export const unsetBackHeader = () => ({ type: UNSET_BACKGROUND_HEADER })
export const toggleMobNav = () => ({ type: TOGGLE_MOB_NAV })
export const toggleSearchNav = () => ({ type: TOGGLE_SEARCH_NAV })
export const hideMobNav = () => ({ type: HIDE_MOB_NAV })

export const showGallery = () => ({ type: SHOW_GALLERY })
export const hideGallery = () => ({ type: HIDE_GALLERY })
export const setGalleryPics = (pics) => ({ type: SET_GALLERY_PICS, payload: pics })

export const setRedirect = (url) => ({ type: SET_REDIRECT, payload: url })
export const resetRedirect = () => ({ type: RESET_REDIRECT })

export const globalPicUp = ({ files }) => {
	return ( dispatch ) => {
    dispatch({type: UPLOAD_PIC_LOAD })
		
			const uploaders = files.map((file, i) => {
				const formData = new FormData();
				formData.append("file", file);
				let config = {
					onUploadProgress: ( progressEvent ) => {
						let percent = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
						dispatch({ type: PIC_UPLOAD_PERCENT, payload: { i, percent } })
					}, headers: { sabti: localStorage.getItem( 'token' ) }
				}
				
				return axios.put(`${ RU }/upload`, formData, config)
					.then(resp => dispatch({ type: PICS_UPLOADED, payload: resp.data}))
			});

			axios.all(uploaders).then((resp) => dispatch({type: ALL_PIC_UPLOADED }));

	}
}

export const cleanGlobalPicUpPercent = () => ({ type: CLEAN_PIC_UPLOAD_PERCENT })

