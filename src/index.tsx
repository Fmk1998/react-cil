import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store'
import App from './App';
import * as serviceWorker from './serviceWorker';
store.subscribe(() => console.log('getState:', store.getState()))
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
serviceWorker.unregister();
