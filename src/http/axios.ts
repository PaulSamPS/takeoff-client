import axios from 'axios';

export const API_URL = 'http://localhost:4000';

export const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const $apiAuth = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = localStorage.getItem('AccessToken');
  return config;
};

$apiAuth.interceptors.request.use(authInterceptor);
