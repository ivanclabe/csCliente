import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from './ActionTypes'

const baseUrl = 'localhost:3000/api/v1/'

export const loginRequest = (credentials) => ({
  type: LOGIN_REQUEST,
  credentials
});

export const receiveLogin = (response) => {
  return {
      type: ActionTypes.LOGIN_SUCCESS,
      token: response.token
  }
}

export const loginError = (message) => ({
  type: LOGIN_FAILURE,
  message
})

export const loginUser = (credentials) => (dispatch) => {
    dispatch(loginRequest(credentials))

    return fetch(baseUrl + 'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('credentials', JSON.stringify(credentials));
            // Dispatch the success action
            // dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};
