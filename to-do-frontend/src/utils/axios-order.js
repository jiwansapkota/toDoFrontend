import axios from 'axios';

const axiosOrder = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

export default axiosOrder;