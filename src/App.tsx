import React, {FunctionComponent} from "react";
import {IntlProvider} from "react-intl"; // 国际化
import Lang from "./locale";
import {connect} from "react-redux";
import {HashRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import SlideBar from "./components/layout/SlideBar";
import {ConnectedRouter} from "connected-react-router";
import {History} from "history";
import MyErrorBoundary from "./components/error/ErrorBoundary";
import "./styles/normalize.scss";

interface OwnProps {
    language?: any,
    history: History
}

interface State {
    setting?: any
}

type Props = OwnProps;


const mapPropsToState = (state: State) => {
    return state.setting;
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
                        <Header/>
                        <Grid container style={{"padding": "20px"}}>
                            {/*<Grid item xs={3}>*/}
                            {/*<SlideBar list={[]}/>*/}
                            {/*</Grid>*/}
                            <Grid item xs={12}>
                                <Main/>
                            </Grid>
                        </Grid>
                    </IntlProvider>
                </HashRouter>
            </ConnectedRouter>
        </MyErrorBoundary>
    );
};

export default connect(mapPropsToState)(App);

