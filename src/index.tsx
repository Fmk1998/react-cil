import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {store, persistor} from './store' // 数据仓库
import {PersistGate} from 'redux-persist/integration/react' // 持久化存储
import App from './App';
import * as serviceWorker from './serviceWorker';
/* @dynamic debug */
import {Debugger} from 'para-lib';
/* @dynamic end */
declare let window: Window & { ParaWeb: any };
/* @dynamic version */
window.ParaWeb = {version: '0.1.0', env: 'dev', buildTime: '2/18/2020, 10:02:48 AM'}
/* @dynamic end */

const init = async (debug: Array<string> = []) => {
    /* @dynamic Debugger */
    await Debugger.init(debug);
    /* @dynamic end */
    // store.subscribe(() => console.log('getState:', store.getState()))
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <App/>
            </PersistGate>
        </Provider>,
        document.getElementById('root')
    );
    serviceWorker.unregister();
}

/* @dynamic init */
init(["http://192.168.2.241:10000"])
/* @dynamic end */
