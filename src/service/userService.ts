import axios from '../config/axios.config'
import api from '../config/api.config'

export const loginService = (username: string, password: string) => {
    return axios.post(api.login, {
        username,
        password
    })
}
export const registerService = (username: string, password: string) => {
    return axios.post(api.register, {
        username,
        password
    })
}
