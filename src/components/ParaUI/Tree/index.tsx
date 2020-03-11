// @ts-nocheck
import React, {FunctionComponent} from "react";
import Tree, {TreeNode} from "rc-tree";
import clsx from "clsx";
import "./ParaTree.scss";
import renderSwitcherIcon from "./iconUtil";

interface OwnProps {
    treeData?: any[],
    defaultSelectedKeys?: any[],
    defaultCheckedKeys?: any[],
    defaultExpandedKeys?: any[],
    selectedKeys?: any[],
    checkedKeys?: any[],
    checkStrictly?: boolean,
    className?: string,
    selectable?: boolean,
    showLine?: boolean,
    checkable?: boolean,
    defaultExpandAll?: boolean,
    defaultExpandParent?: boolean,
    autoExpandParent?: boolean,
    showIcon?: boolean,
    icon?: Function,
    onExpand?: Function,
    onSelect?: Function,
    onCheck?: Function,
    draggable?: boolean,
    onDragStart?: Function,
    onDragEnter?: Function,
    onDrop?: Function,
    onDragOver?: Function,
    onDragEnd?: Function,
    onDragLeave?: Function,
    multiple?: boolean,
    direction?: "ltr" | "rtl";
    prefixCls?: string;
    switcherIcon?: React.ReactElement<any>;
    blockNode?: boolean;
}

export interface ParaTreeNodeAttribute {
    eventKey: string;
    prefixCls: string;
    className: string;
    expanded: boolean;
    selected: boolean;
    checked: boolean;
    halfChecked: boolean;
    children: React.ReactNode;
    title: React.ReactNode;
    pos: string;
    dragOver: boolean;
    dragOverGapTop: boolean;
    dragOverGapBottom: boolean;
    isLeaf: boolean;
    selectable: boolean;
    disabled: boolean;
    disableCheckbox: boolean;
}

export interface ParaTreeNodeProps {
    className?: string;
    checkable?: boolean;
    disabled?: boolean;
    disableCheckbox?: boolean;
    title?: string | React.ReactNode;
    key?: string;
    eventKey?: string;
    isLeaf?: boolean;
    checked?: boolean;
    expanded?: boolean;
    loading?: boolean;
    selected?: boolean;
    selectable?: boolean;
    icon?: ((treeNode: ParaTreeNodeAttribute) => React.ReactNode) | React.ReactNode;
    children?: React.ReactNode;

    [customProp: string]: any;
}

export const getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return `para-${suffixCls}`;
};

const ParaTree: FunctionComponent<OwnProps> = (props) => {
    console.log("TreeProps", props);
    const {
        className,
        showLine,
        checkable,
        showIcon,
        prefixCls: customizePrefixCls,
        switcherIcon,
        blockNode,
        children,
        direction
    } = props;

    const prefixCls = getPrefixCls("tree", customizePrefixCls);
    let tree: any;

    const setTreeRef = (node: any) => {
        tree = node;
    };

    return (
        <Tree
            itemHeight={20}
            ref={setTreeRef}
            {...props}
            prefixCls={prefixCls}
            className={clsx(className, {
                [`${prefixCls}-icon-hide`]: !showIcon,
                [`${prefixCls}-block-node`]: blockNode,
                [`${prefixCls}-rtl`]: direction === "rtl"
            })}
            checkable={checkable ? <span className={`${prefixCls}-checkbox-inner`}/> : checkable}
            switcherIcon={(nodeProps: ParaTreeNodeProps) =>
                renderSwitcherIcon(prefixCls, switcherIcon, showLine, nodeProps)
            }
        >
            {children}
        </Tree>
    );
};

export default ParaTree;
export {
    TreeNode
};
