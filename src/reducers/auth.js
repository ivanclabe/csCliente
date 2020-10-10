import { LOGIN_SUCCESS, LOGIN_REQUEST, LOGIN_FAILURE } from '../redux/ActionTypes';

export const Auth = (
  state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('credentials')
      ? JSON.parse(localStorage.getItem('creds'))
      : null
  },
  action
) => {
  const { type, token } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errMess: '',
        token
      };
    case LOGIN_FAILURE:
      return {...state}
    default:
      return state;
  }
};
