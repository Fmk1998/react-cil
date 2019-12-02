import axios from '../config/axios.config'
import api from '../config/api.config'

export const queryListData = () => {
    return axios.get(api.category)
}
