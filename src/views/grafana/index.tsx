/* webpackChunkName: 'strategy' */
import React, {FunctionComponent, useEffect, useState} from "react";
import Iframe from "react-iframe";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Api from "../../config/api.config";
import "./index.scss";
import SlideBar from "../../components/layout/SlideBar";
import {Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem} from "@material-ui/core";
import {Context} from 'para-lib'


interface OwnProps extends RouteComponentProps {

}

type Props = OwnProps;

interface State {

}

const mapStateToProps = (state: State) => {
    return {};
};
const Grafana: FunctionComponent<Props> = (props) => {

    const [dayBefore, setDayBefore] = useState(30);
    const [dayBefore1, setDayBefore1] = useState(0);

    //刷新时间选择栏
    const [refresh, setRefresh] = useState([
        'Off',
        '5s',
        '10s',
        '30s',
        '1m',
        '5m',
        '15m',
        '30m',
        '1h',
        '2h',
        '1d'
    ]);
    //多选栏状态
    const [selectValue, setSelectValue] = useState([0]);
    //刷新的时间
    const refreshTime = window.localStorage.getItem('refreshTime') || 'Off';
    const [refreshValue, setRefreshValue] = useState(refreshTime);

    //输入框的值
    const [inputValue, setInputValue] = useState('');
    //iframe中的url地址
    const [iframeUrl, setIframeUrl] = useState('');
    //选中框设置的url地址
    const [selectUrl, setSelectUrl] = useState('');
    //路由的地址
    const [currentPath, setCurrentPath] = useState('');
    //路由iframe映射
    let paraPathMapping: any = {
        '/dashboard/home': 'home',
        '/grafana/administrators_operation': 'administrators_operation',
        '/grafana/msg_notice': 'msg_notice',
        '/grafana/mfa_login': 'mfa_login',
        '/grafana/msg_send': 'msg_send'
    };

    //组件渲染时执行钩子函数
    useEffect(() => {

        //获取localStorage中的refreshTime
        const time = localStorage.getItem('refreshTime');
        if (!time) {
            localStorage.setItem('refreshTime', 'Off');
        }
        handleUrl();

        /*this.selectUrl = arr.join('&');
        let status = this.selectUrl ? ('&' + this.selectUrl) : '';
        //修改iframe地址
        setIframeUrl(`${Context.list['Snack']}/package/${pathMapping[routeName]}/`);*/
    }, [props.location.pathname]);

    //拼接iframe前面的url
    const handleUrl = () => {
        const arr = [];
        for (let i = 0, l = selectValue.length; i < l; i++) {
            let item = '';
            if (selectValue[i] === 0) {
                item = 'var-login_status=0&var-login_status=2';
            }
            if (selectValue[i] === 1) {
                item = 'var-login_status=1&var-login_status=3';
            }
            arr.push(item);
        }

        //设置刷新时间
        setRefreshValue(localStorage.getItem('refreshTime') || '');
        setCurrentPath(props.location.pathname);
        //修改SelectUrl
        setSelectUrl(arr.join('&'));
        let status = selectUrl ? ('&' + selectUrl) : '';
        const param = inputValue ? ('&var-param=' + inputValue) : '';
        const from = '&from=now-' + dayBefore + 'd';
        const to = '&to=now-' + dayBefore1 + 'd';
        const paraPath = paraPathMapping[props.location.pathname];
        const time = '&refresh=' + refreshValue;
        if (currentPath !== '/dashboard/home') status = '';
        setIframeUrl(Context.list[paraPath] + status + param + from + to);
        if (refreshValue !== 'Off') {
            setIframeUrl(iframeUrl + time);
        }
        debugger
    };

    //修改天数操作
    const changeNum = (type: string) => (event: React.ChangeEvent<{ value: any }>) => {
        if (type === 'dayBefore') {
            setDayBefore(event.target.value);
        }
        if (type === 'dayBefore1') {
            setDayBefore1(event.target.value);
        }
    };

    /*//修改天数操作
    const changeRefresh =*/


    //修改刷新时间操作
    const changeRefresh = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRefreshValue(event.target.value as string);
    };

    //执行查询操作
    const submit = () => {
        handleUrl();
    };


    return (
        <div className="grafana">
            <div className="grafana-header">
                <form noValidate autoComplete="off">
                    <label>时间：</label>
                    <TextField
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={dayBefore}
                        onChange={changeNum('dayBefore')}
                        style={{width: "115px", height: "40px", padding: "0 10px"}}
                    />
                    <span>天前到</span>
                    <TextField
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        value={dayBefore1}
                        onChange={changeNum('dayBefore1')}
                        style={{width: "115px", height: "40px", padding: "0 10px"}}
                    />
                    <span>天前</span>
                    <label style={{margin: "0 0 0 20px"}}>关键字：</label>
                    <TextField variant="outlined" size="small" value={inputValue}
                               style={{height: "40px", padding: "0 10px"}}/>
                    <Button variant="outlined" size="small" onClick={submit}>查询</Button>
                    <label style={{margin: "0 0 0 20px"}}>刷新间隔：</label>
                    <FormControl variant="outlined" size="small">
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={refreshValue}
                            onChange={changeRefresh}
                        >
                            {
                                refresh.map((value: any, index) => (
                                    <MenuItem value={value}>{value}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </form>
            </div>
            <iframe id="iframe" src={iframeUrl}/>
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Grafana));
