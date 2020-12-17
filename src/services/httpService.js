import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import authDetails from './authDetailsService';

axios.defaults.headers.common['x-auth-token'] = authDetails.getJWT();

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurrred.');
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};