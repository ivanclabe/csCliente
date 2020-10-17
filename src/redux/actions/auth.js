import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../../constants';
import * as authService from '../../services/auth.service';

export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  payload: credentials
});

export const receiveLogin = token => ({
  type: LOGIN_SUCCESS,
  payload: {
    token
  }
});

export const loginError = ({ message: errMessage }) => ({
  type: LOGIN_FAILURE,
  payload: {
    errMessage
  }
});

/** ****** */

export const login = ({ username, password }) => dispatch => {
  dispatch(loginRequest({ username, password }));
  return authService
    .login(username, password)
    .then(response => {
      dispatch(receiveLogin(response, username));
      //Promise.resolve();
    })
    .catch(error => {
      dispatch(loginError(error));
    });
};

export const logout = () => dispatch => {
  return authService.logout().then(response => {
    dispatch({
      type: LOGOUT_SUCCESS
    });
  });
};
