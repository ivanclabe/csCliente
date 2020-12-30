import axios from 'axios';
import { API_URL } from '../config/env.config';

export const login = async (username, password) => {
  const requestOptions = {
    baseURL: API_URL,
    url: 'auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({ username, password })
  };
  const { data, status, statusText } = await axios(requestOptions);
  if (data.success) {
    return data;
  } else {
    if (status === 401) {
      // auto logout if 401 response returned from api
      logout();
      // location.reload(true);
    }
    const error = new Error('Error ' + status + ': ' + statusText);
    throw error;
  }
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    if (localStorage.getItem('token')) {
      reject('Logout invalid!');
    }
    resolve({
      success: true
    });
  });
};
