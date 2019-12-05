import axios from 'axios'
import NProgress from 'nprogress'
import {PROJECT} from '../store/action-types'
import {getCookie} from '../utils/echo'
/* token */
NProgress.configure({showSpinner: false});

const token = getCookie(PROJECT);
console.log('token:', token);

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // NProgress.start();
    /* 可以进行token校验 */
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    // NProgress.done()
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // NProgress.start();
    return response;
}, function (error) {
    // 对响应错误做点什么
    // NProgress.done()
    return Promise.reject(error);
});
export default axios
