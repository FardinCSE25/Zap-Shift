import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'https://zap-shift-server-navy.vercel.app'
})
const UseAxios = () => {
    return axiosInstance;
};

export default UseAxios;