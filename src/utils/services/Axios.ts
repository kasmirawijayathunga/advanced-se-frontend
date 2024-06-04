import axios from 'axios';
import { BACKEND_URL } from '../../config';

const Axios = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
});
  
export default Axios;