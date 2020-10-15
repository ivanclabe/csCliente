import axios from 'axios';

import { API_URL } from '../config/env.config';

const handleResponse = response => {
  if (response.ok) {
    return response;
  } else {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      // location.reload(true);
    }

    const error = new Error('Error ' + response.status + ': ' + response.statusText);
    error.response = response;
    throw error;
  }
};

export const login = credentials => {
  const config = {
    url: API_URL + 'auth/login',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: JSON.stringify(credentials)
  };

  return axios(config)
    .then(handleResponse)
    .then(response => {
      // If login was successful, set the token in local storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('credentials', JSON.stringify(credentials));

      return response;
    });
};

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};
