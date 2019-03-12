import axios from 'axios'
import { change } from 'redux-form'
import { GET_OPTIONS, ADD_OPTION, REMOVE_OPTION, OPTION_LOAD, YOUR_OPTION, ADD_OPTION_ERR, OPTION_PIC_LOAD, OPTION_ADD_PIC,
	UPDATE_OPTION, UPDATE_OPTION_ERR, OPTION_UPDATE_LOAD, RU } from './types'
	import { toastr } from 'react-redux-toastr'

export const getOptions = () => {
	return ( dispatch ) => {
    dispatch( { type: OPTION_LOAD } )
		return axios.get( `${ RU }/options`, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			return dispatch( { type: GET_OPTIONS, payload: resp.data.options } )
		} ).catch( ( e ) => {
      // dispatch( { type: KASABE_ERR } )
		} )
	}
}

export const yourOption = (optionId) => {
	return ( dispatch ) => {
    dispatch( { type: OPTION_LOAD } )
		return axios.get( `${ RU }/yourOption`, {
      params: { optionId: optionId },
			headers: { sabti: localStorage.getItem( 'token' ) }
		})
    .then( resp => {
			dispatch( { type: YOUR_OPTION, payload: resp.data.option } )
      return resp.data.type
		})
    .catch( ( e ) => {
      // dispatch( { type: TAXIBS_ERR } )
		})
	}
}

export const addOption = ( { name, enName, pic, picRef } ) => {
	return ( dispatch ) => {
    dispatch( { type: OPTION_LOAD } )
		return axios.post( `${ RU }/option/add`, { name, enName, pic, picRef }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
	    return dispatch( { type: ADD_OPTION, payload: resp.data.option } );
		} ).catch( ( error ) => {
			return dispatch( { type: ADD_OPTION_ERR } );
		} );

	}
}

export const updateOption = ( { _id, name, enName } ) => {
	return ( dispatch ) => {
    dispatch( { type: OPTION_UPDATE_LOAD } )
		return axios.post( `${ RU }/option/update`, { _id, name, enName }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
	    return dispatch( { type: UPDATE_OPTION, payload: resp.data.option } );
		} ).catch( ( error ) => {
			return dispatch( { type: UPDATE_OPTION_ERR } );
		} );

	}
}

export const removeOption = ( _id ) => {
	return ( dispatch ) => {
    dispatch( { type: OPTION_LOAD } )
		return axios.post( `${ RU }/option/remove`, { _id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} ).then( resp => {
			toastr.info('با تشکر', `${resp.data.centerLength} مرکز هم بروزرسانی شد`)
			return dispatch( { type: REMOVE_OPTION, payload: _id } );
		} ).catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } );
		} );

	}
}

export const optionUploadPic = ({ file }) => {
	return ( dispatch ) => {
    dispatch({type: OPTION_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		let config = {
			onUploadProgress: ( progressEvent ) => {
				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
			},
			headers: {
				sabti: localStorage.getItem( 'token' )
			}
		}
		return axios.put( `${ RU }/upload`, data, config )
			.then(resp => {
				dispatch(change('AddOptionModal', 'picRef', resp.data._id))
				dispatch(change('AddOptionModal', 'pic', resp.data.name))
				return dispatch( { type: OPTION_ADD_PIC, action: resp.data } )
			}).catch(error => {
			})

	}
}


export const optionChangePic = ({ file, id }) => {
	return ( dispatch ) => {
    dispatch({type: OPTION_PIC_LOAD })
		let data = new FormData( )
		data.append( 'file', file )
		data.append( 'id', id )
		let config = {
			onUploadProgress: ( progressEvent ) => {
				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
			}, 
			headers: { sabti: localStorage.getItem( 'token' ) }
		}
		return axios.put( `${ RU }/change/option/pic`, data, config )
			.then(resp => {
				return dispatch( { type: UPDATE_OPTION, payload: resp.data.option } )
			}).catch(error => {
				return dispatch( { type: UPDATE_OPTION_ERR } )
			})

	}
}
