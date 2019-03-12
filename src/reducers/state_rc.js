import { GET_STATES, ADD_STATE, REMOVE_STATE, STATE_LOAD, CLEAN_STATE, UPDATE_STATE, ADD_TOWN_LOAD, SHOW_TOWNS, OFF_SHOW_TOWNS } from '../actions'
import _ from 'lodash'
import { immutableSplice } from '../components/Utils/Imutable'

let states = { stateLoading: false, townLoad: false, error: '', states: [], showTowns: false, selectedTowns: [] }

export default function (state = states, action) {
	switch (action.type) {
		case STATE_LOAD:
			return { ...state, stateLoading: true, }
		case ADD_TOWN_LOAD:
			return { ...state, townLoad: true, }
		case SHOW_TOWNS:
			const selectedTowns = _.find(state.states, {'_id': action.payload}).towns;
			return { ...state, showTowns: true, selectedTowns }
		case OFF_SHOW_TOWNS:
			return { ...state, showTowns: false, }
		case GET_STATES:
			return { ...state, stateLoading: false, states: action.payload }
		case CLEAN_STATE:
			return { ...state, stateLoading: false, states: [] }
		case ADD_STATE:
			return { ...state, stateLoading: false, states: [ ...state.states, action.payload ] }
		case REMOVE_STATE:
			let states = state.states.filter(state => state._id !== action.payload);
      return { ...state, stateLoading: false, states: states }
		case UPDATE_STATE:
			let index = _.findIndex(state.states, {_id: action.payload._id});
			const imutstates = immutableSplice(state.states, index, 1, action.payload)
			return { ...state, stateLoading: false, states: imutstates, townLoad: false }
		default:
			return state;
	}
}
