import {combineReducers} from 'redux'
import counter from './counterReducer'
import category from './categoryReducer'
import user from './userReducer'
import setting from './settingReducer'

export default combineReducers({
    counter,
    category,
    user,
    setting
})
