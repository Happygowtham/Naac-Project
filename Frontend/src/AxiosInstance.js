import axios from 'axios';

import { Config } from './config';

var configData = Config();
const axiosInstance = axios.create(configData);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error?.response?.status === 401) {
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;
