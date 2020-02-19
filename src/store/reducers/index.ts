import {combineReducers} from 'redux'
import setting from './settingReducer'
import menu from './menuReducer'

export default combineReducers({
    setting,
    menu
})
