import {combineReducers} from 'redux'
import category from './categoryReducer'
import user from './userReducer'
import setting from './settingReducer'
import tagLink from './taglinkReducer'
import design from './designReducer'

export default combineReducers({
    category,
    user,
    setting,
    tagLink,
    design
})
