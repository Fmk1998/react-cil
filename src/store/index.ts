import {createStore, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistStore, persistReducer} from "redux-persist";
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers"; // 官方写法
import {PROJECTFIX, PROJECTEND} from "./action-types";

const persistConfig = {
    keyPrefix: PROJECTFIX,
    key: PROJECTEND,
    storage,
    blacklist: ["_persist"], // 黑名单
    whitelist: ["user", "setting"] // 白名单
};
export const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const middleware = applyMiddleware(ReduxThunk, routerMiddleware(history));

const store = createStore(persistedReducer, composeWithDevTools(middleware));

const persistor = persistStore(store);

export {
    store,
    persistor
};
