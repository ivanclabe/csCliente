import axios from 'axios';
import { API_URL } from '../config/env.config';
import authHeader from './auth-header';

export const items = () => {
  return axios.get(API_URL + 'items', {
    headers: authHeader
  });
};
