import {
  GET_ETEHADIYES,
  ADD_ETEHADIYE,
  REMOVE_ETEHADIYE,
  ETEHADIYE_LOAD,
  YOUR_ETEHADIYE,
  CLEAN_ETEHADIYE,
  ETEHADIYE_PIC_LOAD,
  ETEHADIYE_ADD_PIC,
  UPDATE_ETEHADIYE
} from "../actions";
import _ from "lodash";
import { immutableSplice } from "../components/Utils/Imutable";

let etehadiyeDef = {
  etehadiyeLoading: false,
  picLoading: false,
  error: "",
  etehadiyes: [],
  yourType: {},
  formPic: { _id: null, name: null }
};

export default (state = etehadiyeDef, action) => {
  switch (action.type) {
    case ETEHADIYE_LOAD:
      return { ...state, etehadiyeLoading: true };
    case ETEHADIYE_PIC_LOAD:
      return { ...state, picLoading: true, formPic: { _id: null, name: null } };
    case ETEHADIYE_ADD_PIC:
      return { ...state, picLoading: false, formPic: action.payload };
    case GET_ETEHADIYES:
      return { ...state, etehadiyeLoading: false, etehadiyes: action.payload };
    case CLEAN_ETEHADIYE:
      return { ...state, etehadiyeLoading: false, etehadiyes: [] };
    case ADD_ETEHADIYE:
      return { ...state, etehadiyeLoading: false, etehadiyes: [...state.etehadiyes, action.payload] };
    case REMOVE_ETEHADIYE:
      let etehadiyes = state.etehadiyes.filter(etehadiye => etehadiye._id !== action.payload);
      return { ...state, etehadiyeLoading: false, etehadiyes: etehadiyes };
    case YOUR_ETEHADIYE:
      return { ...state, etehadiyeLoading: false, yourType: { ...action.payload } };
    case UPDATE_ETEHADIYE:
      let index = _.findIndex(state.etehadiyes, { _id: action.payload._id });
      const imutrastes = immutableSplice(state.etehadiyes, index, 1, action.payload);
      return { ...state, etehadiyeLoading: false, etehadiyes: imutrastes };
    default:
      return state;
  }
};
