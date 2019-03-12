import { CHANGE_CENTER_COORDINATE, CHANGE_MARKER_COORDINATES, CHANGE_MAP_ZOOM } from '../actions/types'

const map = { center:[54.399883, 32.159084 ], zoom:[4], markerCoordinates:[54.399883, 32.159084 ] }

export default (state = map, action) => {
	switch (action.type) {
		case CHANGE_CENTER_COORDINATE: return { ...state, center: action.payload }
		case CHANGE_MARKER_COORDINATES: return { ...state, markerCoordinates: action.payload }
		case CHANGE_MAP_ZOOM: return { ...state, zoom: action.payload }
		default: return state;
	}
}
