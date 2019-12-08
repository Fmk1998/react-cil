import {combineReducers} from 'redux'
import category from './categoryReducer'
import user from './userReducer'
import setting from './settingReducer'
import tagLink from './taglinkReducer'

export default combineReducers({
    category,
    user,
    setting,
    tagLink
})
