import {
    LOGIN,
    REGISTER
} from '../action-types'
import {
    loginService,
    registerService
} from '../../service/userService'

export const loginAction = (username: string, password: string) => async (dispatch: any) => {
    const {data, err}: any = await loginService(username, password)
    if (err) return false;
    dispatch({type: LOGIN, payload: data.data})
}
export const registerAction = (username: string, password: string) => async (dispatch: any) => {
    const data = await registerService(username, password)
    console.log("REGISTER:", data)
    dispatch({type: REGISTER, payload: data})
}
