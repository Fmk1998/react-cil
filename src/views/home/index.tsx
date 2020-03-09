import React, {FunctionComponent} from "react";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {ParaTable} from "../../components/ParaUI";
import Api from "../../config/api.config";
import "./index.scss";

interface OwnProps extends RouteComponentProps {
    currentMenu?: string
}

type Props = OwnProps;

interface State {
    menu?: {
        currentMenu?: string
    }
}

const mapStateToProps = (state: State) => {
    return {
        currentMenu: state.menu?.currentMenu
    };
};
const CONFIG = {
    url: Api.testTable,
    ctx: "osc",
    params: {
        page: 1,
        size: 25
    },
    header: [
        {id: "prName", label: "prName"},
        {id: "prAddress", label: "prAddress"},
        {id: "prResType_name", label: "prResType_name"},
        {id: "id", label: "id"}
    ],
    columns: [
        {
            label: "操作",
            operator: [
                {
                    type: "button",
                    label: "编辑",
                    variant: "contained",
                    color: "primary",
                    onClick: (row: any) => {
                        console.log("编辑 Button ====>", row);
                    }
                },
                {
                    type: "button",
                    label: "删除",
                    onClick: (row: any) => {
                        console.log("删除 Button ====>", row);
                    }
                }]
        }
    ]
};
const Home: FunctionComponent<Props> = (props) => {
    return (
        <div className="common-iframe">
            {/*{*/}
            {/*props.currentMenu*/}
            {/*? <span>{props.currentMenu}</span>*/}
            {/*: <span>页面跑丢了,需要添加后续逻辑</span>*/}
            {/*}*/}
            <ParaTable config={CONFIG}/>
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Home));
