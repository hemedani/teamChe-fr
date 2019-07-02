import {
  GET_OTAGH_ASNAFS,
  GET_SELECTED_OTAGH_ASNAF,
  GET_SELECTED_OTAGH_ASNAF_LOAD,
  GET_SELECTED_OTAGH_ASNAF_ERR,
  ADD_OTAGH_ASNAF,
  REMOVE_OTAGH_ASNAF,
  OTAGH_ASNAF_LOAD,
  YOUR_OTAGH_ASNAF,
  CLEAN_OTAGH_ASNAF,
  OTAGH_ASNAF_PIC_LOAD,
  OTAGH_ASNAF_ADD_PIC,
  UPDATE_OTAGH_ASNAF
} from "../actions";
import _ from "lodash";
import { immutableSplice } from "../components/Utils/Imutable";

let otaghAsnafDef = {
  otaghAsnafLoading: false,
  picLoading: false,
  error: "",
  otaghAsnafs: [],
  selectedOtaghAsnafLoad: false,
  selectedOtaghAsnaf: {},
  yourType: {},
  formPic: { _id: null, name: null }
};

export default (state = otaghAsnafDef, action) => {
  switch (action.type) {
    case OTAGH_ASNAF_LOAD:
      return { ...state, otaghAsnafLoading: true };
    case OTAGH_ASNAF_PIC_LOAD:
      return { ...state, picLoading: true, formPic: { _id: null, name: null } };
    case OTAGH_ASNAF_ADD_PIC:
      return { ...state, picLoading: false, formPic: action.payload };

    case GET_SELECTED_OTAGH_ASNAF:
      return {
        ...state,
        selectedOtaghAsnafLoad: false,
        selectedOtaghAsnafLoad: { ...state.selectedOtaghAsnaf, ...action.payload }
      };
    case GET_SELECTED_OTAGH_ASNAF_LOAD:
      return { ...state, selectedOtaghAsnafLoad: true };
    case GET_SELECTED_OTAGH_ASNAF_ERR:
      return { ...state, selectedOtaghAsnafLoad: false };

    case GET_OTAGH_ASNAFS:
      return { ...state, otaghAsnafLoading: false, otaghAsnafs: action.payload };
    case CLEAN_OTAGH_ASNAF:
      return { ...state, otaghAsnafLoading: false, otaghAsnafs: [] };
    case ADD_OTAGH_ASNAF:
      return { ...state, otaghAsnafLoading: false, otaghAsnafs: [...state.otaghAsnafs, action.payload] };
    case REMOVE_OTAGH_ASNAF:
      let otaghAsnafs = state.otaghAsnafs.filter(otaghAsnaf => otaghAsnaf._id !== action.payload);
      return { ...state, otaghAsnafLoading: false, otaghAsnafs: otaghAsnafs };
    case YOUR_OTAGH_ASNAF:
      return { ...state, otaghAsnafLoading: false, yourType: { ...action.payload } };
    case UPDATE_OTAGH_ASNAF:
      let index = _.findIndex(state.otaghAsnafs, { _id: action.payload._id });
      const imutrastes = immutableSplice(state.otaghAsnafs, index, 1, action.payload);
      return { ...state, otaghAsnafLoading: false, otaghAsnafs: imutrastes };
    default:
      return state;
  }
};
