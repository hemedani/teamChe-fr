import {
  GET_OTAGH_BAZARGANIS,
  ADD_OTAGH_BAZARGANI,
  REMOVE_OTAGH_BAZARGANI,
  OTAGH_BAZARGANI_LOAD,
  YOUR_OTAGH_BAZARGANI,
  CLEAN_OTAGH_BAZARGANI,
  OTAGH_BAZARGANI_PIC_LOAD,
  OTAGH_BAZARGANI_ADD_PIC,
  UPDATE_OTAGH_BAZARGANI
} from "../actions";
import _ from "lodash";
import { immutableSplice } from "../components/Utils/Imutable";

let otaghBazarganiDef = {
  otaghBazarganiLoading: false,
  picLoading: false,
  error: "",
  otaghBazarganis: [],
  yourType: {},
  formPic: { _id: null, name: null }
};

export default (state = otaghBazarganiDef, action) => {
  switch (action.type) {
    case OTAGH_BAZARGANI_LOAD:
      return { ...state, otaghBazarganiLoading: true };
    case OTAGH_BAZARGANI_PIC_LOAD:
      return { ...state, picLoading: true, formPic: { _id: null, name: null } };
    case OTAGH_BAZARGANI_ADD_PIC:
      return { ...state, picLoading: false, formPic: action.payload };
    case GET_OTAGH_BAZARGANIS:
      return { ...state, otaghBazarganiLoading: false, otaghBazarganis: action.payload };
    case CLEAN_OTAGH_BAZARGANI:
      return { ...state, otaghBazarganiLoading: false, otaghBazarganis: [] };
    case ADD_OTAGH_BAZARGANI:
      return { ...state, otaghBazarganiLoading: false, otaghBazarganis: [...state.otaghBazarganis, action.payload] };
    case REMOVE_OTAGH_BAZARGANI:
      let otaghBazarganis = state.otaghBazarganis.filter(otaghBazargani => otaghBazargani._id !== action.payload);
      return { ...state, otaghBazarganiLoading: false, otaghBazarganis: otaghBazarganis };
    case YOUR_OTAGH_BAZARGANI:
      return { ...state, otaghBazarganiLoading: false, yourType: { ...action.payload } };
    case UPDATE_OTAGH_BAZARGANI:
      let index = _.findIndex(state.otaghBazarganis, { _id: action.payload._id });
      const imutrastes = immutableSplice(state.otaghBazarganis, index, 1, action.payload);
      return { ...state, otaghBazarganiLoading: false, otaghBazarganis: imutrastes };
    default:
      return state;
  }
};
