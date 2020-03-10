import React, {FunctionComponent, useEffect, useState} from "react";
import {withRouter, RouteComponentProps, useLocation} from "react-router-dom";
import {useDispatch, connect} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Translate from "@material-ui/icons/Translate";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {SETTING, LOGINOUT, SIDEBAR, PROJECT, CURRENT_MENU} from "../../../store/action-types";
import {RoutesMapping} from "../../../routes.config";
import {queryMenusAction} from "../../../store/actions/menuAction";
import "./index.scss";
import {sequlizeURL} from "../../../utils/echo";

interface OwnProps extends RouteComponentProps {
    list?: Array<any>,
    hashMenuMapping?: any
}

type Props = OwnProps;

interface State {
    menu?: {
        list?: Array<any>
    }
}

const mapStateToProps = (state: { menu: State }) => {
    return state.menu;
};

// 语言切换
const Language = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (lang: string) => {
        dispatch({
            type: SETTING,
            payload: lang
        });
        handleClose();
    };

    return (
        <div className="language">
            <Button aria-controls="simple-menu" onClick={handleClick} style={{color: "#ffffff"}}>
                <Translate/>
                <span>Language</span>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => changeLanguage("zh")}>中文</MenuItem>
                <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
            </Menu>
        </div>
    );
};

// 个人中心
const Profile = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const loginOut = () => {
        dispatch({
            type: LOGINOUT
        });
        handleClose();
    };

    return (
        <div>
            <IconButton aria-label="profile" color="inherit" onClick={handleClick}>
                <AccountCircle/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={loginOut}>LoginOut</MenuItem>
            </Menu>
        </div>
    );
};

const Header: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();
    let location = useLocation();
    const [clickKey, setClickKey] = useState("");

    const openNewPage = (value: any) => () => {
        /* 防止重复点击 */
        if (value[RoutesMapping.key] === clickKey) {
            return false;
        } else {
            setClickKey(value[RoutesMapping.key]);
        }
        if (value.children) {
            let url: string = "";
            let two = value.children[0];
            if (two.children) {
                url = sequlizeURL(two.children[0][RoutesMapping.url]);
                props.history.push(url);
            }
        }
    };


    useEffect(() => {
        if (location.pathname !== "/") {
            let hash = props.hashMenuMapping[location.pathname];
            if (hash) {
                dispatch({
                    type: SIDEBAR,
                    payload: hash.parent
                });
            }
            dispatch({
                type: CURRENT_MENU,
                url: location.pathname
            });
        } else {
            // 根hash的时候 取第一个
            if (Object.keys(props.hashMenuMapping).length) {
                let oneArr = Object.keys(props.hashMenuMapping);
                let oneData = props.hashMenuMapping[oneArr[0]].parent;
                dispatch({
                    type: SIDEBAR,
                    payload: oneData
                });
                window.location.href = `#${oneData[0].children[0][RoutesMapping.url]}`;
            }
        }
    });

    // 请求菜单数据
    useEffect(() => {
        dispatch(queryMenusAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <AppBar position="fixed" className="header">
            <Toolbar>
                <Typography variant="h5" className="header-logo">
                    <img src={require("../../../assets/logo.png")} alt=""/>
                    <span>{PROJECT}</span>
                </Typography>
                <div className={"header-menu"}>
                    {props.list && props.list.map((value: any, index: number) => (
                        value[RoutesMapping.path] !== "/"
                            ? <Button key={index} style={{color: "#fff"}}
                                      onClick={openNewPage(value)}>{value[RoutesMapping.name]}</Button>
                            : null
                    ))}
                </div>
                <div className="header-right">
                    <Language/>
                    <Profile/>
                </div>
            </Toolbar>
        </AppBar>
    );
};
export default withRouter(connect(mapStateToProps, null)(Header));


