import React from 'react';
import {IntlProvider} from 'react-intl' // 国际化
import language from './lang'
import './styles/normalize.scss'
import {connect} from "react-redux";
import Header from './components/layout/Header';
import Main from './components/layout/Main';
import Footer from './components/layout/Footer';


interface Props {
    language?: any
}

interface State {
    setting?: any
}

const mapPropsToState = (state: State) => {
    return state.setting
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.getLocalMessage = this.getLocalMessage.bind(this)
    }

    getLocalMessage() {
        let msg: object
        if (this.props.language === 'zh-CN' || this.props.language === 'zh') {
            msg = language.zh
        } else {
            msg = language.en
        }
        return {...msg}
    }

    render(): React.ReactNode {
        const {language} = this.props;
        return (
            <div className={"App"}>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

export default connect(mapPropsToState)(App);

