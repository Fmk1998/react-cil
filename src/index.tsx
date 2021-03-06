import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store, persistor, history} from "./store"; // 数据仓库
import {PersistGate} from "redux-persist/integration/react"; // 持久化存储
import App from "./App";
import * as serviceWorker from "./serviceWorker";
/* @dynamic debug */
import {Debugger} from 'para-lib';
/* @dynamic end */
declare let window: Window & { ParaWeb: any };
/* @dynamic version */
window.ParaWeb = {version: '0.1.0', env: 'dev', buildTime: '2020-6-9 9:45:17'}
/* @dynamic end */

const init = async (debug: Array<string> = []) => {
    /* @dynamic Debugger */
    await Debugger.init(debug);
    /* @dynamic end */
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <App history={history}/>
            </PersistGate>
        </Provider>,
        document.getElementById("root")
    );
    serviceWorker.unregister();
};

/* @dynamic init */
init(["http://192.168.2.241:10000"])
/* @dynamic end */
