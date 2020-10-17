import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../../constants';

const token = JSON.parse(localStorage.getItem('token'));
const initialState = token ? { isLoggendIn: true, token } : { isLoggendIn: false, token: null };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isLoggendIn: false, token: null };
    case LOGIN_SUCCESS:
      const { token } = payload;
      return {
        ...state,
        isLoggendIn: true,
        token
      };
    case LOGIN_FAILURE:
      const { errMessage } = payload;
      return { ...state, isLoggendIn: false, token: null, errMessage };
    case LOGOUT_SUCCESS:
      return { ...state, isLoggendIn: false, token: null };
    default:
      return state;
  }
};
