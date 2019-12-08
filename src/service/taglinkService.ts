import axios from '../config/axios.config'
import api from '../config/api.config'

export const getAllTagLinks = () => {
    return axios.get(api.taglink)
}
