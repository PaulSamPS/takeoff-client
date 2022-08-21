import axios from 'axios';

export const API_URL = 'http://176.113.83.209:4000';

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const $apiAuth = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const authInterceptor = (config: any) => {
  config.headers.authorization = localStorage.getItem('AccessToken');
  return config;
};

$apiAuth.interceptors.request.use(authInterceptor);

export { $api, $apiAuth };
