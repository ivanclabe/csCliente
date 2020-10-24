import axios from '../config/axios.config';
import authHeader from './auth-header';

export const proveedoresList = () => {
  return axios
    .get('/proveedores', {
      headers: { ...authHeader }
    })
    .then(response => {
      const { data, status, statusText } = response;
      if (data.success) {
        return data;
      } else {
        const error = new Error('Error ' + status + ': ' + statusText);
        throw error;
      }
    });
};
