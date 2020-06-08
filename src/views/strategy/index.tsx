/* webpackChunkName: 'strategy' */
import React, {FunctionComponent, useEffect, useState} from "react";
import Iframe from "react-iframe";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Api from "../../config/api.config";
import "./index.scss";
import SlideBar from "../../components/layout/SlideBar";
import {Context} from 'para-lib'


interface OwnProps extends RouteComponentProps {

}

type Props = OwnProps;

interface State {

}

const mapStateToProps = (state: State) => {
    return {};
};
const Strategy: FunctionComponent<Props> = (props) => {

    //定义iframe地址
    const [path, setPath] = useState("");


    //路由地址映射
    let pathMapping: any = {
        'risk_rule': 'MFARiskRule',
        'common_ip': 'MFACommonIP',
        'network_ip': 'MFANetworkIP',
        'date_strategy': 'MFADateStrategy',
        'account_strategy': 'MFAAccountStrategy',
        'common_equipment': 'MFACommonEquipment',
        'login_factor_setting': 'MFALoginFactor',
        'auth_level': 'MFAAuthentication',
        'quarantine_area': 'MFAQuarantineArea',
        'trust_area': 'MFATrustArea',
        'multi_device': 'MFAMultiDevice'
    };

    useEffect(() => {
        console.log(Context);
        //获取路由地址
        let routeName = props.location.pathname.slice(props.location.pathname.lastIndexOf("/") + 1);
        //修改iframe地址
        setPath(`${Context.list['Snack']}/package/${pathMapping[routeName]}/`);
    }, [props.location.pathname]);

    return (
        <div className="strategy">
            <SlideBar sideList={[]}/>
            <iframe id="iframe" src={path}/>
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Strategy));
