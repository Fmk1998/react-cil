import {combineReducers} from 'redux'
import counter from './counterReducer'
import category from './categoryReducer'
import user from './userReducer'

export default combineReducers({
    counter,
    category,
    user
})
