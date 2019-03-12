import { 
	CHANGE_CENTER_COORDINATE, CHANGE_MARKER_COORDINATES, CHANGE_MAP_ZOOM } from './types'


export const changeCenterCoordinates = (coordinates) => ({ type: CHANGE_CENTER_COORDINATE, payload: coordinates })
export const changeMarkerCoordinates = (coordinates) => ({ type: CHANGE_MARKER_COORDINATES, payload: coordinates })
export const changeMapZoom = (zoom) => ({ type: CHANGE_MAP_ZOOM, payload: zoom })
