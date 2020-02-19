import React, {FunctionComponent} from 'react';
import {IntlProvider} from 'react-intl' // 国际化
import language from './lang'
import {connect} from "react-redux";
import {HashRouter} from 'react-router-dom'
import Grid from "@material-ui/core/Grid"
import Header from './components/layout/Header';
import Main from './components/layout/Main';
// import Footer from './components/layout/Footer';
import SlideBar from './components/layout/SlideBar'
import './styles/normalize.scss'

interface OwnProps {
    language?: any
}

interface State {
    setting?: any
}

type Props = OwnProps;


const mapPropsToState = (state: State) => {
    return state.setting
}

const App: FunctionComponent<Props> = (props) => {

    const getLocalMessage = () => {
        let msg: object
        if (props.language === 'zh-CN' || props.language === 'zh') {
            msg = language.zh
        } else {
            msg = language.en
        }
        return {...msg}
    }

    return (
        <div className={"App"}>
            <IntlProvider key="intl" locale={props.language} messages={getLocalMessage()}>
                <HashRouter>
                    <Header/>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <SlideBar/>
                        </Grid>
                        <Grid item xs={9}>
                            <Main/>
                        </Grid>
                    </Grid>
                </HashRouter>
            </IntlProvider>
        </div>
    );
};

export default connect(mapPropsToState)(App);

