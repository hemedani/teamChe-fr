import {
  GET_PARISHES,
  ADD_PARISH,
  REMOVE_PARISH,
  PARISH_LOAD,
  YOUR_PARISH,
  CLEAN_PARISH,
  SET_PARISH_COORDS
} from "../actions/types";

let parishDef = {
  parishLoading: false,
  error: "",
  parishes: [],
  yourParish: { location: { coordinates: [54.399883, 32.159084] } },
  zoom: [12]
};

export default (state = parishDef, action) => {
  switch (action.type) {
    case PARISH_LOAD:
      return { ...state, parishLoading: true };
    case GET_PARISHES:
      return { ...state, parishLoading: false, parishes: action.payload };
    case CLEAN_PARISH:
      return { ...state, parishLoading: false, parishes: [] };
    case ADD_PARISH:
      return { ...state, parishLoading: false, parishes: [...state.parishes, action.payload] };
    case REMOVE_PARISH:
      let parishes = state.parishes.filter(shahr => shahr._id !== action.payload);
      return { ...state, parishLoading: false, parishes: parishes };
    case YOUR_PARISH:
      return { ...state, parishLoading: false, yourParish: { ...state.yourParish, ...action.payload } };
    case SET_PARISH_COORDS:
      return {
        ...state,
        parishLoading: false,
        yourParish: { ...state.yourParish, location: { coordinates: action.payload }, zoom: [14] }
      };
    default:
      return state;
  }
};
