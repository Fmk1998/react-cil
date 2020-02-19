import React, {FunctionComponent} from 'react';
import {IntlProvider} from 'react-intl' // 国际化
import language from './lang'
import './styles/normalize.scss'
import {connect} from "react-redux";
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';
import SlideBar from './components/layout/SlideBar'
import {Grid} from "@material-ui/core"

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
                <Grid container className="root">
                    <Header/>
                    <SlideBar/>
                    <Main/>
                </Grid>
            </IntlProvider>
        </div>
    );
};

export default connect(mapPropsToState)(App);

