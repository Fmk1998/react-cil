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
import SubRecuMenu from "../../SubRecuMenu";

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

//中间菜单
/*const SubRecuMenu = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        props.history.push("/demo")
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{color: "#ffffff"}}>
                MFA策略
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>认证设置</MenuItem>
                <MenuItem onClick={handleClose}>登录因子</MenuItem>
                <MenuItem onClick={handleClose}>基础策略设置</MenuItem>
                <MenuItem onClick={handleClose}>常用IP</MenuItem>
                <MenuItem onClick={handleClose}>网络策略</MenuItem>
                <MenuItem onClick={handleClose}>账号策略</MenuItem>
                <MenuItem onClick={handleClose}>日期策略</MenuItem>
                <MenuItem onClick={handleClose}>多设备策略</MenuItem>
                <MenuItem onClick={handleClose}>信任区</MenuItem>
                <MenuItem onClick={handleClose}>隔离区区</MenuItem>
            </Menu>
        </div>
    );
};*/

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

    const [subMenu, setSubMenu] = useState([
        {
            name: "MFA策略",
            children: [{name: "认证设置",url:"http://lin.paraview.in/snackbar/package/MFAAuthentication/",router:"/strategy/auth_level"}, {name: "登录因子",url:"http://lin.paraview.in/snackbar/package/MFALoginFactor",router:"/strategy/login_factor_setting"},  {name: "基础策略设置",url:"http://lin.paraview.in/snackbar/package/MFACommonEquipment",router:"/strategy/common_equipment"}, {name: "常用IP",url:"http://lin.paraview.in/snackbar/package/MFACommonIP",router:"/strategy/common_ip"}, {name: "网络策略",url:"http://lin.paraview.in/snackbar/package/MFANetworkIP",router:"/strategy/network_ip"}, {name: "账号策略",url:"http://lin.paraview.in/snackbar/package/MFAAccountStrategy",router:"/strategy/account_strategy"}, {name: "日期策略",url:"http://lin.paraview.in/snackbar/package/MFADateStrategy",router:"/strategy/date_strategy"}, {name: "多设备策略",url:"http://lin.paraview.in/snackbar/package/MFARiskRule",router:"/strategy/risk_rule"}, {name: "信任区",url:"http://lin.paraview.in/snackbar/package/MFATrustArea",router:"/strategy/trust_area"}, {name: "隔离区",url:"http://lin.paraview.in/snackbar/package/MFAQuarantineArea",router:"/strategy/quarantine_area"}]
        }, {name: "审计管理", children: [{name: "管理员操作日志",url:"http://192.168.2.37:3000/d/pPnHp3jWz/guan-li-yuan-cao-zuo-ri-zhi?orgId=1&kiosk&from=now-30d&to=now-0d&refresh=5s",router:"/grafana/administrators_operation"}, {name: "消息通知日志",url:"http://192.168.2.37:3000/d/o2OEK3CZz/xiao-xi-tong-zhi-ji-lu?orgId=1&kiosk&from=now-30d&to=now-0d&refresh=5s",router:"/grafana/msg_notice"}, {name: "MFA登录日志",url:"http://192.168.2.37:3000/d/6YqIiqCZk/mfadeng-lu-ri-zhi?orgId=1&kiosk&from=now-30d&to=now-0d&refresh=5s",router:"/grafana/mfa_login"}, {name: "消息发送",url:"http://192.168.2.37:3000/d/o2OEK3CZz/xiao-xi-tong-zhi-ji-lu?orgId=1&kiosk&from=now-30d&to=now-0d&refresh=5s",router:"/grafana/msg_send"}]}
])
;

return (
    <AppBar position="fixed" className="header">
        <Toolbar>
            <Typography variant="h5" className="header-logo">
                <img src={require("../../../assets/logo.png")} alt=""/>
                <span>{PROJECT}</span>
            </Typography>
            <div className={"header-menu"}>
                {/*{props.list && props.list.map((value: any, index: number) => (
                        value[RoutesMapping.path] !== "/"
                            ? <Button key={index} style={{color: "#fff"}}
                                      onClick={openNewPage(value)}>{value[RoutesMapping.name]}</Button>
                            : null
                    ))}*/}

                {subMenu.map((value: any, index: number) =>
                    <SubRecuMenu item={value}/>
                )}
            </div>
            <div className="header-right">
                <Language/>
                <Profile/>
            </div>
        </Toolbar>
    </AppBar>
);
}
;
export default withRouter(connect(mapStateToProps, null)(Header));


