import axios from 'axios';
// import { history } from '../';

export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }
});
