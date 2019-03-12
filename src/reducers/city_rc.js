import { GET_CITIES, ADD_CITY, REMOVE_CITY, CITY_LOAD, YOUR_CITY, CLEAN_CITY, SET_CITY_COORDS } from '../actions/types'

let cityDef = { cityLoading: false, error: '', cities: [], yourCity: { location: { coordinates: [54.399883, 32.159084] }}, zoom: [12] }

export default (state = cityDef, action) => {
	switch (action.type) {
		case CITY_LOAD:
			return { ...state, cityLoading: true, }
		case GET_CITIES:
			return { ...state, cityLoading: false, cities: action.payload }
		case CLEAN_CITY:
			return { ...state, cityLoading: false, cities: [] }
		case ADD_CITY:
			return { ...state, cityLoading: false, cities: [ ...state.cities, action.payload ] }
		case REMOVE_CITY:
			let cities = state.cities.filter(shahr => shahr._id !== action.payload);
      return { ...state, cityLoading: false, cities: cities }
		case YOUR_CITY:
      return { ...state, cityLoading: false, yourCity: { ...state.yourCity, ...action.payload } }
		case SET_CITY_COORDS:
      return { ...state, cityLoading: false, yourCity: { ...state.yourCity, location: { coordinates: action.payload }, zoom: [14] } }
		default:
			return state;
	}
}
