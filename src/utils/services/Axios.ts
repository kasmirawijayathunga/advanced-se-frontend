import axios from 'axios';
import { BACKEND_URL } from '../../config';
import Auth from './Auth';

const Axios = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
});

Axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;
    if(status === 401) {
      // Handle unauthorized access
      Auth.refresh();
    }
    return Promise.reject(error);
  }
);
  
export default Axios;