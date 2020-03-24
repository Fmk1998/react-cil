import React, {FunctionComponent, useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {ParaTable, ParaTree, TreeNode, ParaRequestTree} from "../../components/ParaUI";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Api from "../../config/api.config";
import "./index.scss";
import {
    Get,
    ObjectConverParameters,
    ParametersConverObject
} from "para-lib";

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

interface DataNode {
    title: string;
    key: string;
    isLeaf?: boolean;
    children?: DataNode[];
}


const SIZE_CONST = 3;

function updateTreeData(list: DataNode[], key: React.Key, children: DataNode[], isMore: boolean): DataNode[] {
    return list.map((node: any) => {
        if (node.key === key) {
            if (isMore) {
                if (children.length && children.length > SIZE_CONST) {
                    const temp = node.children[node.children.length];
                    node.children.splice(-1, 1);
                    children.map((it: any) => {
                        node.children?.push(it);
                    });
                    return node.children?.splice(-1, 0, temp);
                } else {
                    node.children?.splice(-1, 1);
                    children.map((it: any) => {
                        return node.children?.push(it);
                    });
                }
            } else {
                return {...node, children};
            }
        } else if (node.children) {
            return {
                ...node,
                children: updateTreeData(node.children, key, children, isMore)
            };
        }
        return node;
    });
}

const Home: FunctionComponent<Props> = (props) => {
    // const [treeData, setTreeData]: any = React.useState([]);
    // const [treeDataMapping, setTreeDataMapping]: any = React.useState({});
    // const [params] = useState({page: 1, size: SIZE_CONST, parentId: ""});
    //
    // const onSelect = (selectedKeys: any, e: any) => {
    //     const {selected, node} = e;
    //     if (selected && node.more) {
    //         onLoadData(node);
    //     }
    // };
    //
    // const onCheck = (checkedKeys: any) => {
    //     console.log(checkedKeys);
    // };
    //
    // const onExpend = (expendedKeys: any, e: any) => {
    //     const {expanded, node} = e;
    //     if (expanded) {
    //
    //     }
    // };
    //
    // const fetchData = async (para: any) => {
    //     const {data, err}: any = await Get({
    //         url: `${Api.testTree}?${ObjectConverParameters(para)}`,
    //         ctx: "osc"
    //     });
    //     if (err) return;
    //     loopTreeDataMapping(data.data.list);
    //     return data.data.list;
    // };
    //
    // /* 生成所有数据对应map图 */
    // const loopTreeDataMapping = React.useCallback((data) => {
    //         if (data && data.length > 0) {
    //             data.map((value: any) => {
    //                 setTreeDataMapping((origin: any) => {
    //                     if (!origin[value.id]) {
    //                         origin[value.id] = {
    //                             page: 1,
    //                             size: SIZE_CONST
    //                         };
    //                     }
    //                     return origin;
    //                 });
    //             });
    //         }
    //     },
    //     []
    // );
    //
    // const onLoadData = (treeNode: any) => {
    //     const {key, children, more} = treeNode;
    //     return new Promise(resolve => {
    //         if (children) {
    //             resolve();
    //             return;
    //         }
    //         if (!more) {
    //             /* 展开下级 */
    //             let opts = Object.assign({}, {...treeDataMapping[key]}, {parentId: key});
    //             fetchData(opts).then(data => {
    //                 if (data && data.length >= SIZE_CONST) {
    //                     data = [...data, {
    //                         id: Math.random(),
    //                         prName: "加载更多",
    //                         isLeaf: true,
    //                         more: true,
    //                         parentId: opts.parentId
    //                     }];
    //                 }
    //                 console.log(data);
    //                 setTreeData((origin: any) => updateTreeData(origin, key, data, false));
    //             });
    //         } else {
    //             /* 加载更多 */
    //             treeDataMapping[treeNode.parentId].page = treeDataMapping[treeNode.parentId].page + 1;
    //             let opts = Object.assign(
    //                 {},
    //                 {...treeDataMapping[treeNode.parentId]},
    //                 {parentId: treeNode.parentId}
    //             );
    //             fetchData(opts).then(data => {
    //                 setTreeData((origin: any) => {
    //                     return updateTreeData(origin, treeNode.parentId, data, true);
    //                 });
    //             });
    //         }
    //         resolve();
    //     });
    // };
    //
    // useEffect(() => {
    //     fetchData(params).then((dat) => {
    //         setTreeData(dat);
    //     });
    //     return () => {
    //     };
    // }, [params]);

    const requestCallback = (data: any, cb: any) => {
        cb(data.data.list);
    };

    return (
        <div className="common-iframe">
            {/* tree */}
            {/*<ParaTree*/}
            {/*onSelect={onSelect}*/}
            {/*onCheck={onCheck}*/}
            {/*loadData={onLoadData}*/}
            {/*treeData={treeData}*/}
            {/*onExpand={onExpend}*/}
            {/*replaceFields={{key: "id", title: "prName"}}*/}
            {/*/>*/}
            <br/>

            {/* hook */}
            {/*{TestUseAsync()}*/}
            {/*{TestUseRouter()}*/}
            <ParaRequestTree
                request={{
                    url: Api.testTree,
                    params: {page: 1, size: 3, parentId: ""},
                    ctx: "osc"
                }}
                requestCallback={requestCallback}
                parent={"parentId"}
                replaceFields={{key: "id", title: "prName"}}
            />
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Home));
