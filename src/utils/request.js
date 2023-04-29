import axios from 'axios';
import { redirect } from 'react-router-dom';
// import { redirect } from 'react-router-dom'
// 创建axios实例
const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 1000,
})


// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || ''
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

// 响应拦截器
axiosInstance.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    console.log(err.response);
    if (err.response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return Promise.reject(err.response.data.error)
})


export default axiosInstance