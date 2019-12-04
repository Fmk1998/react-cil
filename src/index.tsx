import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {store, persistor} from './store' // 数据仓库
import {PersistGate} from 'redux-persist/integration/react' // 持久化存储
import App from './App';
import * as serviceWorker from './serviceWorker';

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
