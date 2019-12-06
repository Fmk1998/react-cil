import {combineReducers} from 'redux'
import category from './categoryReducer'
import user from './userReducer'
import setting from './settingReducer'

export default combineReducers({
    category,
    user,
    setting
})
