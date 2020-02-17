import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {store, persistor} from './store' // 数据仓库
import {PersistGate} from 'redux-persist/integration/react' // 持久化存储
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Debugger} from 'para-lib';

const init = async (debug: Array<string> | null = null) => {
    if (debug instanceof Array) await Debugger.init(debug); // 开发调试组件
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
if (process.env.NODE_ENV === 'development')
    init();
else
    init();