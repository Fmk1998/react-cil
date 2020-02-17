import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {store, persistor} from './store' // 数据仓库
import {PersistGate} from 'redux-persist/integration/react' // 持久化存储
import App from './App';
import * as serviceWorker from './serviceWorker';
/* @dynamic debug */
/* dynamic 为动态代码注释,请勿删除 */
/* @dynamic end */
declare let window: Window & { ParaWeb: any };
/* @dynamic version */
window.ParaWeb = {version: '0.1.0',env: '', buildTime: '2/18/2020, 12:42:02 AM'}
/* @dynamic end */

const init = async (debug: Array<string> = []) => {
    /* @dynamic Debugger */
    /* dynamic 为动态代码注释,请勿删除 */
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
init()
/* @dynamic end */
