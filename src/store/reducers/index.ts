import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import setting from "./settingReducer";
import menu from "./menuReducer";
import loading from "./loadingReducer";

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    setting,
    menu,
    loading
});

export default createRootReducer;
