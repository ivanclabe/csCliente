import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../types';

const token = localStorage.getItem('token');
const initialState = token ? { isLoggedIn: true, token } : { isLoggendIn: false, token: null };

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isLoggedIn: false, token: null };
    case LOGIN_SUCCESS:
      const { token } = payload;
      return {
        ...state,
        isLoggedIn: true,
        token
      };
    case LOGIN_FAILURE:
      const { errMessage } = payload;
      return { ...state, isLoggedIn: false, token: null, errMessage };
    case LOGOUT_SUCCESS:
      return { ...state, isLoggedIn: false, token: null };
    default:
      return state;
  }
};
