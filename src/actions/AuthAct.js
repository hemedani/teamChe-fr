import axios from 'axios'
import { AUTH_USER, ACCEPT_PHONE, DECREASE_AUTH_TIMER, STOP_AUTH_TIMER, USER_LOAD, UNAUTH_USER, AUTH_ERROR, UPDATE_USER, USER_PIC_LOAD, USER_SIGNIN_LOAD, CLEAN_CART, RU } from './types'

export const signinUser = ({ email, password }) => {
	return ( dispatch ) => {
    dispatch({ type: USER_SIGNIN_LOAD })
		return axios.post(`${ RU }/login`, { email, password })
      .then(resp => {
        resp.data.user && localStorage.setItem( 'user', JSON.stringify(resp.data.user) )
				localStorage.setItem( 'token', resp.data.token )
				return dispatch({ type: AUTH_USER, payload: resp.data });
  		}).catch(( e ) => {
  			return dispatch(authError( 'neshod biai to etelaat ghalatand' ))
  		})
	}
}

let authInterval = null;

const handleAuthTimer = () => {
	let storeTimer = parseInt(localStorage.getItem('acceptCodeTimer')) || 0
	if (storeTimer >= 1) {
		localStorage.setItem('acceptCodeTimer', --storeTimer)
		return { type: DECREASE_AUTH_TIMER, payload: --storeTimer }
	} else {
		localStorage.setItem('acceptCodeTimer', null)
		clearInterval(authInterval)
		return { type: STOP_AUTH_TIMER }
	}
}

export const signWithMob = (usr) => {
	return ( dispatch ) => {
    dispatch({ type: USER_SIGNIN_LOAD })
		return axios.post(`${ RU }/login/with/captcha`, usr)
      .then(resp => {
				if (process.env.NODE_ENV === 'development') {
					console.log('====================================');
					console.log(resp.data);
					console.log('====================================');
				}
				clearInterval(authInterval)
				resp.data.user && localStorage.setItem( 'user', JSON.stringify(resp.data.user) )
				localStorage.setItem('acceptCodeTimer', 90)
				authInterval = setInterval(() => dispatch(handleAuthTimer()), 1000)
				return dispatch({ type: ACCEPT_PHONE, payload: resp.data })
  		}).catch(( e ) => {
  			return dispatch(authError( 'neshod biai to etelaat ghalatand' ))
  		})
	}
}

export const sendCode = (usr) => {
	return ( dispatch ) => {
    dispatch({ type: USER_SIGNIN_LOAD })
		return axios.post(`${ RU }/login/acceptkey`, usr)
      .then(resp => {
				if (resp.data.user) {
					clearInterval(authInterval)
					localStorage.setItem('acceptCodeTimer', null)
					resp.data.user && localStorage.setItem( 'user', JSON.stringify(resp.data.user) )
					localStorage.setItem( 'token', resp.data.token )
					return dispatch({ type: AUTH_USER, payload: resp.data });
				} else {
					return dispatch(authError( 'neshod biai to etelaat ghalatand' ))
				}
  		}).catch(( e ) => {
  			return dispatch(authError( 'neshod biai to etelaat ghalatand' ))
  		})
	}
}

export const editOwn = (usr) => {
	return ( dispatch ) => {
    dispatch({ type: USER_SIGNIN_LOAD })
		return axios.post(`${ RU }/user/editown`, usr, { headers: { sabti: localStorage.getItem( 'token' ) } } )
      .then(resp => {
        resp.data.user && localStorage.setItem( 'user', JSON.stringify(resp.data.user) )
				return dispatch({ type: AUTH_USER, payload: resp.data });
  		}).catch(( e ) => {
  			return dispatch(authError( 'neshod biai to etelaat ghalatand' ))
  		})
	}
}

export const register = ({ email, password, address, name, familyName, phone }) => {
	return ( dispatch ) => {
    dispatch({ type: USER_SIGNIN_LOAD })
		return axios.post(`${ RU }/register`, { email, password, address, name, familyName, phone })
			.then(resp => {
        resp.data.user && localStorage.setItem( 'user', JSON.stringify(resp.data.user) )
				localStorage.setItem( 'token', resp.data.token )
				return dispatch({ type: AUTH_USER, payload: resp.data })
			}).catch(( error ) => {
				if (error.response && error.response.data && error.response.data.error && error.response.data.error === "Email e has") {
					return dispatch(authError( 'این ایمیل در دسترس نیست لطفا ایمیل دیگری را امتحان کنید' ))
				} else if (error.response && error.response.data && error.response.data.error && error.response.data.error === "Shomare e has") {
					return dispatch(authError( 'این شماره قبلا ثبت نام کرده است - لطفا شماره دیگری را امتحان کنید' ))
				} else {
					return dispatch(authError( 'ثبت نام انجام نشد لطفا دوباره تلاش کنید' ))
				}
			})
	}
}

export const authError = ( err ) => ({ type: AUTH_ERROR, payload: err })

export const singoutUser = (dispatch) => {
	localStorage.removeItem( 'token' )
	localStorage.removeItem( 'user' )
	return (dispatch) => {
		dispatch( { type: CLEAN_CART } )
		return dispatch( { type: UNAUTH_USER } )
	}
}

export const changePic = ({ _id, file }) => {
	return ( dispatch ) => {
    dispatch({type: USER_PIC_LOAD })
		let data = new FormData( )
		data.append( 'userId', _id )
		data.append( 'file', file )
		let config = {
			onUploadProgress: ( progressEvent ) => {
				let percentCompleted = Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total )
				// console.log( percentCompleted )
			},
			headers: { sabti: localStorage.getItem( 'token' ) } }
		return axios.put( `${ RU }/upload`, data, config ).then(resp => {
			return dispatch({ type: UPDATE_USER, payload: resp.data })
		}).catch(error => {
		})

	}
}


// -------- Ina baraye in bood ke befaham chejori mishe err chach ro gereft -----
// console.log('error', error)
// console.log('errorType', typeof error)
// console.log('error', Object.assign({}, error))
// console.log('getOwnPropertyNames', Object.getOwnPropertyNames(error))
// console.log('Akey', error.response.data.error)
// -----------------------------------------------------------------------
