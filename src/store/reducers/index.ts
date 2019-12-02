import {combineReducers} from 'redux'
import counter from './counterReducer'
import category from './categoryReducer'

export default combineReducers({
    counter,
    category
})
