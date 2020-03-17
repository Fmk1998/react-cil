import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store, persistor, history} from "./store"; // 数据仓库
import {PersistGate} from "redux-persist/integration/react"; // 持久化存储
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
/* @dynamic debug */
import {Debugger, Context} from 'para-lib';
/* @dynamic end */
declare let window: Window & { ParaWeb: any };
/* @dynamic version */
window.ParaWeb = {version: '0.1.0', env: 'dev', buildTime: '3/17/2020, 4:33:58 PM'}
/* @dynamic end */

const theme = createMuiTheme({
    palette: {
        primary: blue
    }
    // palette: {
    //     primary: {
    //         // light: will be calculated from palette.primary.main,
    //         main: '#ff4400',
    //         // dark: will be calculated from palette.primary.main,
    //         // contrastText: will be calculated to contrast with palette.primary.main
    //     },
    //     secondary: {
    //         light: '#0066ff',
    //         main: '#0044ff',
    //         // dark: will be calculated from palette.secondary.main,
    //         contrastText: '#ffcc00',
    //     },
    //     // Used by `getContrastText()` to maximize the contrast between
    //     // the background and the text.
    //     contrastThreshold: 3,
    //     // Used by the functions below to shift a color's luminance by approximately
    //     // two indexes within its tonal palette.
    //     // E.g., shift from Red 500 to Red 300 or Red 700.
    //     tonalOffset: 0.2,
    // },
});
const init = async (debug: Array<string> = []) => {
    /* @dynamic Debugger */
    await Debugger.init(debug);
    /* @dynamic end */
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <ThemeProvider theme={theme}>
                    <App history={history}/>
                </ThemeProvider>
            </PersistGate>
        </Provider>,
        document.getElementById("root")
    );
    serviceWorker.unregister();
};

/* @dynamic init */
init(["http://192.168.2.241:10000"])
/* @dynamic end */
