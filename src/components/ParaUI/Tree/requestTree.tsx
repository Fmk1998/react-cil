import React, {FunctionComponent, useEffect, useState} from "react";
import ParaTree, {ParaTreeProps} from "./index";
// import "./index.scss";
import {
    Get,
    ObjectConverParameters
} from "para-lib";

export interface Params {
    page?: number;
    size?: number;

    [customProp: string]: any;
}

export interface RequestProps {
    url: string;
    ctx?: string;
    params?: Params;
}

export interface RequestTreeProps extends ParaTreeProps {
    request: RequestProps;
    requestCallback: Function;
    parent?: string;
    componentWillMount?: Function
}

interface DataNode {
    title: string;
    key: string;
    isLeaf?: boolean;
    children?: DataNode[];
}


let SIZE_CONST = 3;
let TREE_MAPPING: any = {};

function updateTreeData(list: DataNode[], key: React.Key, children: DataNode[], isMore: boolean): DataNode[] {
    return list.map((node: any) => {
        /* 建立索引TreeDataMapping映射关系 */
        if (!TREE_MAPPING[node.key]) {
            TREE_MAPPING[node.key] = node;
        }
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

const RequestTree: FunctionComponent<RequestTreeProps> = (props) => {
    let {
        request,
        parent,
        replaceFields,
        onSelect,
        requestCallback,
        componentWillMount
    }: any = props;

    let initialParamsState: Params | null = {};
    let URL: string = "";

    /* 初始化URL解析 */
    if (typeof request === "string") {
        URL = request;
        initialParamsState = null;
    } else if (typeof request === "object") {
        URL = request.url;
        initialParamsState = request.params || null;
        if (request.size) SIZE_CONST = request.size; // 更改分页默认值
    } else {
        throw Error("request 对象异常");
    }
    /* 父节点依据字段 */
    if (!parent) {
        parent = "parent";
    }

    const [treeData, setTreeData]: any = React.useState([]);
    const [treeDataMapping, setTreeDataMapping]: any = React.useState({});
    const [params] = useState(initialParamsState);

    const onSelectHandler = (selectedKeys: any, e: any) => {
        const {selected, node} = e;
        if (selected && node.more) {
            onLoadData(node);
        } else {
            if (onSelect) onSelect(selectedKeys, e, TREE_MAPPING[node.key]);
        }
    };

    const fetchData = async (para: any) => {
        let url: string = "";
        let options: any = {};
        let val: any = null;
        if (para) {
            url = `${URL}?${ObjectConverParameters(para)}`;
        } else {
            url = `${URL}`;
        }
        options.url = url;
        if (request.ctx) {
            options.ctx = request.ctx;
        }
        const {data, err}: any = await Get(options);
        if (err) return;

        requestCallback(data, (value: any) => {
            loopTreeDataMapping(value);
            val = value;
        });
        return val;
    };

    /* 生成所有数据对应map图 */
    const loopTreeDataMapping = React.useCallback((data) => {
            if (data && data.length > 0) {
                data.map((value: any) => {
                    setTreeDataMapping((origin: any) => {
                        if (!origin[value.id]) {
                            origin[value.id] = {
                                page: 1,
                                size: SIZE_CONST
                            };
                        }
                        return origin;
                    });
                });
            }
        },
        []
    );

    const onLoadData = (treeNode: any) => {
        const {key, children, more} = treeNode;
        return new Promise(resolve => {
            if (children) {
                resolve();
                return;
            }
            if (!more) {
                /* 展开下级 */
                let obj: any = {};
                let obj2: any = {id: Math.random(), isLeaf: true, more: true};
                obj[parent] = key;
                let opts = Object.assign({}, {...treeDataMapping[key]}, obj);
                if (replaceFields && replaceFields.title) {
                    obj2[replaceFields.title] = "加载更多";
                } else {
                    obj2["title"] = "加载更多";
                }
                fetchData(opts).then((data: any) => {
                    obj2[parent] = opts[parent];
                    if (data && data.length >= SIZE_CONST) data = [...data, obj2];
                    setTreeData((origin: any) => updateTreeData(origin, key, data, false));
                });
            } else {
                /* 加载更多 */
                treeDataMapping[treeNode[parent]].page = treeDataMapping[treeNode[parent]].page + 1;
                let objParent: any = {};
                objParent[parent] = treeNode[parent];
                let opts = Object.assign({}, {...treeDataMapping[treeNode[parent]]}, objParent);
                fetchData(opts).then((data: any) => {
                    setTreeData((origin: any) => {
                        return updateTreeData(origin, treeNode[parent], data, true);
                    });
                });
            }
            resolve();
        });
    };

    useEffect(() => {
        fetchData(params).then((dat) => {
            setTreeData(dat);
        });
    }, [params]);

    useEffect(() => {
        return () => {
            if (componentWillMount) {
                componentWillMount();
            }
        };
    });

    return (
        <ParaTree
            onSelect={onSelectHandler}
            loadData={onLoadData}
            treeData={treeData}
            checkStrictly={true}
            {...props}
        />
    );
};

export default RequestTree;
