import { GET_MASSAGES, ADD_MASSAGE, REMOVE_MASSAGE, MASSAGE_LOAD, YOUR_MASSAGE, CLEAN_MASSAGE,  READ_MASSAGE_LOAD, READ_MASSAGE,
	SET_TIMER_MASSAGE, MASSAGE_PIC_LOAD, MASSAGE_ADD_PIC, UPDATE_MASSAGE, DECREASE_MSG_TIMER, STOP_MSG_TIMER } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let massageDef = { massageLoading: false, sendAbility: true, error: '', massages: [], yourMassage: {}, abilityTimer: 0, readMassageLoading: '' }

export default (state = massageDef, action) => {
	switch (action.type) {
		case MASSAGE_LOAD:
			return { ...state, massageLoading: true, }
		case GET_MASSAGES:
			return { ...state, massageLoading: false, massages: action.payload }
		case READ_MASSAGE_LOAD:
			return { ...state, readMassageLoading: action.payload }
		case READ_MASSAGE:
			let massagesWithoutRead = state.massages.filter(massage => massage._id !== action.payload._id);
			return { ...state, massageLoading: false, massages: massagesWithoutRead, readMassageLoading: '' }
		case CLEAN_MASSAGE:
			return { ...state, massageLoading: false, massages: [] }
		case DECREASE_MSG_TIMER:
			return { ...state, abilityTimer: action.payload, sendAbility: false }
		case STOP_MSG_TIMER:
			return { ...state, abilityTimer: 0, sendAbility: true }
		case ADD_MASSAGE:
			return { ...state, massageLoading: false, massages: [ ...state.massages, action.payload ], sendAbility: false, abilityTimer: 240 }
		case REMOVE_MASSAGE:
			let massages = state.massages.filter(massage => massage._id !== action.payload);
      return { ...state, massageLoading: false, massages: massages }
		case YOUR_MASSAGE:
      return { ...state, massageLoading: false, yourMassage: { ...action.payload } }
		case UPDATE_MASSAGE:
			let index = _.findIndex(state.massages, {_id: action.payload._id});
			const imutrastes = immutableSplice(state.massages, index, 1, action.payload)
      return { ...state, massageLoading: false, massages: imutrastes }
		default:
			return state;
	}
}
