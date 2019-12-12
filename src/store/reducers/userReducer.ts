import {
    PROJECT,
    LOGIN,
    REGISTER,
    LOGINOUT
} from '../action-types'
import {
    setCookie, removeCookie
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
        case LOGINOUT:
            removeCookie(PROJECT);
            return Object.assign({}, state, {user: null, access_token: null})
        default:
            return state;
    }
}
