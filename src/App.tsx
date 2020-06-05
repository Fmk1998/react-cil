import React, {FunctionComponent} from "react";
import {IntlProvider} from "react-intl"; // 国际化
import Lang from "./locale";
import {connect} from "react-redux";
import {HashRouter} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Loading from "./components/loading/Loading";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {History} from "history";
import MyErrorBoundary from "./components/error/ErrorBoundary";
import SlideBar from "./components/layout/SlideBar";
import whiteTheme from "./theme/White";
import "./styles/normalize.scss";

interface Props {
    language?: any,
    history: History
}

interface State {
    setting?: {
        language: string
    }
}

const mapStateToProps = (state: State) => {
    return {
        language: state.setting?.language
    };
};

const App: FunctionComponent<Props> = ({history, language}: Props) => {
    const getLocalMessage = () => {
        let msg: object;
        if (language === "zh-CN" || language === "zh") {
            msg = Lang.zh;
        } else {
            msg = Lang.en;
        }
        return {...msg};
    };

    return (
        <MyErrorBoundary>
            <ConnectedRouter history={history}>
                <HashRouter>
                    <IntlProvider key="intl" locale={language} messages={getLocalMessage()}>
                        <MuiThemeProvider theme={whiteTheme}>
                            <div className="App">
                                <Loading/>
                                <Header/>
                                <Main/>
                            </div>
                        </MuiThemeProvider>
                    </IntlProvider>
                </HashRouter>
            </ConnectedRouter>
        </MyErrorBoundary>
    );
};

export default connect(mapStateToProps, null)(App);

