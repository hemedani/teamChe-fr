import { GET_RASTES, ADD_RASTE, REMOVE_RASTE, RASTE_LOAD, YOUR_RASTE, CLEAN_RASTE, UPDATE_RASTE } from "../actions";
import _ from "lodash";
import { immutableSplice } from "../components/Utils/Imutable";

let def = {
  rasteLoading: false,
  picLoading: false,
  error: "",
  rastes: [],
  yourType: {}
};

export default (state = def, action) => {
  switch (action.type) {
    case RASTE_LOAD:
      return { ...state, rasteLoading: true };
    case GET_RASTES:
      return { ...state, rasteLoading: false, rastes: action.payload };
    case CLEAN_RASTE:
      return { ...state, rasteLoading: false, rastes: [] };
    case ADD_RASTE:
      return { ...state, rasteLoading: false, rastes: [...state.rastes, action.payload] };
    case REMOVE_RASTE:
      let rastes = state.rastes.filter(raste => raste._id !== action.payload);
      return { ...state, rasteLoading: false, rastes: rastes };
    case YOUR_RASTE:
      return { ...state, rasteLoading: false, yourType: { ...action.payload } };
    case UPDATE_RASTE:
      let index = _.findIndex(state.rastes, { _id: action.payload._id });
      const imutrastes = immutableSplice(state.rastes, index, 1, action.payload);
      return { ...state, rasteLoading: false, rastes: imutrastes };
    default:
      return state;
  }
};
