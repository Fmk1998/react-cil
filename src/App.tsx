import React from 'react';
import {IntlProvider, FormattedHTMLMessage} from 'react-intl' // 国家化
import language from './lang'
import HashRouterModel from './router'
import './styles/normalize.scss'
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

interface Props {

}

interface State {
    lang: string,
    val: string
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            lang: navigator.language || 'zh',
            val: ''
        }
        this.getLocalMessage = this.getLocalMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    getLocalMessage() {
        let msg: object
        if (this.state.lang === 'zh-CN' || this.state.lang === 'zh') {
            msg = language.zh
        } else {
            msg = language.en
        }
        return {...msg}
    }

    handleChange(event: React.ChangeEvent<{ value: unknown }>) {
        const value: any = event.target.value;
        this.setState({
            lang: value,
            val: value
        })
    }

    render(): React.ReactNode {
        const {lang, val} = this.state
        return (
            <div className={"App"}>
                <IntlProvider key="intl" locale={lang} messages={this.getLocalMessage()}>
                    <HashRouterModel/>
                    <FormControl style={{width: "100%"}}>
                        <InputLabel className={"app-language-select"}>请选择语言</InputLabel>
                        <Select
                            value={val}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={"zh"}>中文</MenuItem>
                            <MenuItem value={"en"}>English</MenuItem>
                        </Select>
                    </FormControl>
                    {/* 国际化测试 */}
                    <br/>
                    <FormattedHTMLMessage id={"home"}/>
                </IntlProvider>
            </div>
        );
    }
}

// const App: React.FC = () => {
//     return (
//         <div className="App">
//             <HashRouterModel/>
//         </div>
//     );
// }

export default App;
