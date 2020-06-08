import React, {FunctionComponent, useEffect, useState} from "react";
import {withRouter, RouteComponentProps, useLocation} from "react-router-dom";
import {useDispatch, connect} from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./index.scss";
import {SIDEBAR} from "../../store/action-types";

interface OwnProps extends RouteComponentProps {
    item?: any
}

type Props = OwnProps;

interface State {

}

const mapStateToProps = (state: { menu: State }) => {

};


const SubRecuMenu: FunctionComponent<Props> = (props) => {
        const dispatch = useDispatch();

        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleItemClick = (router: string, url: string) => {
            //修改侧边栏菜单
            dispatch({
                type: SIDEBAR,
                payload: props.item.children
            });

            //跳转到指定路径
            props.history.push({pathname: router, state: {url: url}});

            //关闭菜单栏
            handleClose();
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        return (
            <div className="SubRecuMenu">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color: "#ffffff"}}>
                    {props.item.name}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {props.item.children && props.item.children.length > 0 ? props.item.children.map((value: any, index: number) =>
                        <MenuItem onClick={() => handleItemClick(value.router, value.url)}>{value.name}</MenuItem>
                    ) : null}

                </Menu>
            </div>
        );
    }
;
export default withRouter(connect(mapStateToProps, null)(SubRecuMenu));


