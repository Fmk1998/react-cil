import React, {FunctionComponent, useEffect} from 'react';
import {withRouter, RouteComponentProps} from "react-router-dom";
import {useDispatch, connect} from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"
import Translate from "@material-ui/icons/Translate"
import AccountCircle from "@material-ui/icons/AccountCircle"
import {SETTING, LOGINOUT, SIDEBAR, PROJECT} from "../../../store/action-types"
import {RoutesMapping} from '../../../routes.config'
import {queryMenusAction} from "../../../store/actions/menuAction";
import './index.scss';

interface OwnProps extends RouteComponentProps {
    list?: []
}

type Props = OwnProps;

interface State {
    menu?: object
}

const mapPropsToState = (state: { menu: State }) => {
    return state.menu
}

// 语言切换
const Language = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const changeLanguage = (lang: string) => {
        dispatch({
            type: SETTING,
            payload: lang
        })
        handleClose()
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
}

// 个人中心
const Profile = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const loginOut = () => {
        dispatch({
            type: LOGINOUT
        })
        handleClose();
    }

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
    )
}

const Header: FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();

    const openNewPage = (value: any) => () => {
       props.history.push(value)
    }
    return (
        <AppBar position="static" className="header">
            <Toolbar>
                <Typography variant="h5" className="header-logo">
                    <img src={require("../../../assets/logo.png")} alt=""/>
                    <span>{PROJECT}</span>
                </Typography>
                <div className={"header-menu"}>
                    {props.list && props.list.map((value: any, index: number) => (
                        value.path !== '/'
                            ? <Link key={index} onClick={openNewPage(value.path)}>{value.name}</Link>
                            : null
                    ))}
                </div>
                <div className="header-right">
                    <Language/>
                    <Profile/>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default withRouter(connect(mapPropsToState, null)(Header));


