import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from '../../constants';
import { userServices } from '../../services';
import { API_URL } from '../../config/env.config';

export const loginRequest = credentials => ({
  type: LOGIN_REQUEST,
  credentials
});

export const receiveLogin = response => ({
  type: LOGIN_SUCCESS,
  token: response.token
});

export const loginError = message => ({
  type: LOGIN_FAILURE,
  message
});

export const loginUser = credentials => dispatch => {
  dispatch(loginRequest(credentials));
  return userServices
    .login(credentials)
    .then(response => {
      dispatch(receiveLogin(response));
    })
    .catch(error => dispatch(loginError(error.message)));
};

export const _loginUser = credentials => {
  alert(credentials.username);
  return dispatch => {
    // dispatch(loginRequest(credentials));
    return fetch(API_URL + 'auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            const error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
          throw error;
        }
      )
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', response.token);
          localStorage.setItem('credentials', JSON.stringify(credentials));
          // Dispatch the success action
          // dispatch(fetchFavorites());
          dispatch(receiveLogin(response));
        } else {
          let error = new Error('Error ' + response.status);
          error.response = response;
          throw error;
        }
      })
      .catch(error => dispatch(loginError(error.message)));
  };
};
