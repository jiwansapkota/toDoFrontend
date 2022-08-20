import axios from 'axios';
import { getBearerToken } from './AuthUtils';

const axiosOrder = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:6311/todo'
});

axiosOrder.interceptors.request.use(
    (config) => {
        const token = getBearerToken();
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = token?.Authorization;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosOrder.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        window.location.href = '/login'
    }
    return error;
});

export default axiosOrder;