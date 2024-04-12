// axiosConfig.js

import axios from 'axios';
import store from './store'; // Assuming you have a Redux store configured

const api = axios.create({
  baseURL: 'http://localhost:8081/',
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response || error.response.status === 500) {
      // Store failed request in Redux with "unsaved" flag
      store.dispatch({
        type: 'SAVE_FAILED_REQUEST',
        payload: error.config, // You might need to refine this payload based on your needs
      });
      // Retry mechanism
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Retry after 2 seconds
      return api(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;
