import axios from 'axios'
import { change } from 'redux-form'
import { GET_MASSAGES, GET_MASSAGES_ERR, ADD_MASSAGE, REMOVE_MASSAGE, MASSAGE_LOAD, 
	YOUR_MASSAGE, ADD_MASSAGE_ERR, READ_MASSAGE_LOAD, READ_MASSAGE,
	MASSAGE_UPDATE_LOAD, UPDATE_MASSAGE_ERR, DECREASE_MSG_TIMER, STOP_MSG_TIMER, RU } from './types'
import { toastr } from 'react-redux-toastr'

export const getMassages = () => {
	return ( dispatch ) => {
    dispatch( { type: MASSAGE_LOAD } )
		return axios.get( `${ RU }/massages`, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: GET_MASSAGES, payload: resp.data.massages } ))
			.catch( ( e ) => dispatch( { type: GET_MASSAGES_ERR } ))
	}
}

export const readMassage = (msg) => {
	return ( dispatch ) => {
    dispatch( { type: READ_MASSAGE_LOAD, payload: msg._id } )
		return axios.post( `${ RU }/massage/read`, msg,{ headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: READ_MASSAGE, payload: resp.data.massage } ))
			.catch( ( e ) => dispatch( { type: GET_MASSAGES_ERR } ))
	}
}

export const replyMassage = (_id, reply) => {
	return ( dispatch ) => {
    dispatch( { type: READ_MASSAGE_LOAD } )
		return axios.post( `${ RU }/massage/read`, { _id, reply },{ headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => dispatch( { type: READ_MASSAGE, payload: resp.data.massage } ))
			.catch( ( e ) => dispatch( { type: GET_MASSAGES_ERR } ))
	}
}

let abilityInterval = null;

const handleMsgTimer = () => {
	let storeTimer = parseInt(localStorage.getItem('storeMsgTimer')) || 0
	if (storeTimer >= 1) {
		localStorage.setItem('storeMsgTimer', --storeTimer)
		return {
			type: DECREASE_MSG_TIMER,
			payload: --storeTimer
		}
	} else {
		localStorage.setItem('storeMsgTimer', null)
		clearInterval(abilityInterval)
		return {
			type: STOP_MSG_TIMER
		}
	}
}

export const sendMassage = ( msg ) => {
	return ( dispatch ) => {
    dispatch( { type: MASSAGE_LOAD } )
		return axios.post( `${ RU }/massage/add`, msg, { headers: { sabti: localStorage.getItem( 'token' ) } } )
			.then( resp => {
				clearInterval(abilityInterval)
				toastr.success('با تشکر', 'پیام شما با موفقیت ارسال شد')
				localStorage.setItem('storeMsgTimer', 240)
				abilityInterval = setInterval(() => dispatch(handleMsgTimer()), 1000)
				return dispatch( { type: ADD_MASSAGE, payload: resp.data.massage } )} 
			)
			.catch( ( error ) => dispatch( { type: ADD_MASSAGE_ERR } ))
	}
}


export const removeMassage = ( id ) => {
	return ( dispatch ) => {
    dispatch( { type: MASSAGE_LOAD } )
		axios.post( `${ RU }/massage/remove`, { id }, {
			headers: { sabti: localStorage.getItem( 'token' ) }
		} )
		.then( resp => dispatch( { type: REMOVE_MASSAGE, payload: id } ))
		.catch( ( error ) => {
			// dispatch( { type: KASABE_ERR } )
		} )

	}
}

