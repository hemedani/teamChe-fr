import { GET_CONFIG_LOADING, GET_CONFIG, GET_CONFIG_ERR, CHANGE_KEY_VALUE_CONFIG, CLEAN_CONFIG } from '../actions/types'

const config = { configLoading: false, config: {}, configErr: null }
export default function (state = config, action) {
	switch (action.type) {
		case GET_CONFIG_LOADING: return { ...state, configLoading: true };
		case GET_CONFIG: return { ...state, configLoading: false, config: action.payload, configErr: null };
		case GET_CONFIG_ERR: return { ...state, configLoading: false, config: {}, configErr: 'مشکلی در دریافت تنظیمات به وجود آمده است' };
		case CHANGE_KEY_VALUE_CONFIG:
			let config = Object.assign({}, state.config);
			config[action.payload.key] = action.payload.value;
			return { ...state, config };
		case CLEAN_CONFIG: return config;
		default: return state;
	}
}
