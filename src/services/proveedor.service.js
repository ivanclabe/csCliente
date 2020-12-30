import axios from '../config/axios.config';
import authHeader from './auth-header';

export const proveedoresList = () => {
  const headers = authHeader();
  return axios
    .get('/proveedores', {
      headers: { ...headers }
    })
    .then(response => {
      const { data } = response;
      return data.rows;
    })
    .catch(err => {
      const error = new Error(err.message);
      throw error;
    });
};
