import axios from 'axios'
import NProgress from 'nprogress'

axios.interceptors.request.use(config => {
    NProgress.start();
    return config
}, error => {
    NProgress.done()
    return Promise.resolve(error)
})

axios.interceptors.response.use(response => {
    NProgress.start();
    return response;
}, error => {
    NProgress.done()
    return Promise.resolve({...error, err: error.response || {}})
})

export default axios
