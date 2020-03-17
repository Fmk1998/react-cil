import React, {FunctionComponent} from "react";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {ParaTable, ParaTree, TreeNode} from "../../components/ParaUI";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Api from "../../config/api.config";
import "./index.scss";
import {TestUseAsync} from "../../utils/Hooks/useAsync";
import {TestUseRouter} from "../../utils/Hooks/useRouter";

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
    ],
    externals: (scope: any) => <span>{JSON.stringify(scope)}</span>
};

const treeData = [
    {
        id: "0-0",
        name: "parent 1",
        children: [
            {
                id: "0-0-0",
                name: "parent 1-1",
                children: [{id: "0-0-0-0", name: "parent 1-1-0"}]
            },
            {
                id: "0-0-1",
                name: "parent 1-2",
                children:
                    [{
                        id: "0-0-1-0",
                        name: "parent 1-2-0",
                        disableCheckbox: true
                    },
                        {
                            id: "0-0-1-1",
                            name: "parent 1-2-1"
                        }
                    ]
            }
        ]
    }
];

const Home: FunctionComponent<Props> = (props) => {
    return (
        <div className="common-iframe">
            {/*{*/}
            {/*props.currentMenu*/}
            {/*? <span>{props.currentMenu}</span>*/}
            {/*: <span>页面跑丢了,需要添加后续逻辑</span>*/}
            {/*}*/}
            {/*<ParaTable config={CONFIG}/>*/}
            <br/>
            {/* tree */}
            <ParaTree
                treeData={treeData}
                defaultExpandAll={true}
                checkable={true}
                replaceFields={{title: "name", key: "id"}}
            >
                {/*<TreeNode title="123123 1" key="0-1">*/}
                {/*<TreeNode title="fasdfad 1-0" key="0-1-1">*/}
                {/*<TreeNode title="leaf" isLeaf/>*/}
                {/*<TreeNode title="leaf"/>*/}
                {/*</TreeNode>*/}
                {/*<TreeNode title="parent 1-1">*/}
                {/*<TreeNode title="leaf"/>*/}
                {/*</TreeNode>*/}
                {/*</TreeNode>*/}
            </ParaTree>

            <br/>
            {/* hook */}
            {TestUseAsync()}
            {TestUseRouter()}
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Home));
