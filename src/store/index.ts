import {createStore} from 'redux'
import rootReducers from './reducers'

// @ts-ignore
const store = createStore(
    rootReducers,
)
export default store;
