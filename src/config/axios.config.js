import axios from 'axios';
import { API_URL } from './env.config';

const instance = axios.create({
  baseURL: API_URL
});

export default instance;
