import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers' // 官方写法

const persistConfig = {
    key: 'ParaRD',
    storage,
    blacklist: [], // 黑名单
    whitelist: ['user'] // 白名单
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = applyMiddleware(ReduxThunk)

const store = createStore(
    persistedReducer,
    composeWithDevTools(middleware))

const persistor = persistStore(store)

export {
    store,
    persistor
};
