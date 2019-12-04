import {
    PROJECT,
    LOGIN,
    REGISTER
} from '../action-types'
import {
    setCookie
} from '../../utils/echo'

const initState: object = {}
export default function userReducer(state = initState, action: any) {
    switch (action.type) {
        case LOGIN:
            // access_token
            setCookie(PROJECT, action.payload.access_token);
            return Object.assign({}, state, action.payload);
        case REGISTER:
            console.log('registerReducer ======>')
            return state;
        default:
            return state;
    }
}
