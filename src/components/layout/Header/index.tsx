import React, {FunctionComponent} from 'react';
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
import {SETTING, LOGINOUT, MENU} from "../../../store/action-types"
import {routes, RoutesConfig} from '../../../routes.config'
import './index.scss';

interface OwnProps extends RouteComponentProps {
    list?: []
}

type Props = OwnProps;

interface State {
    menu?: object
}

const mapPropsToState = (state: State) => {
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

const MenuConfig = (props: Props) => {

    const openNewPage = (value: RoutesConfig) => () => {
        props.history.push(value.path)
    }

    const routes = props.list;
    return(
        <div>
            {routes.map((value: RoutesConfig) => (
                value.path !== '/'
                    ? <Link key={value.path} onClick={openNewPage(value)}
                    >{value.name}</Link>
                    : null
            ))}
        </div>

    )
}



const Header: FunctionComponent<Props> = (props) => {

    return (
        <AppBar position="static" className="header">
            <Toolbar>
                <Typography variant="h5" className="header-logo">
                    <img src={require("../../../assets/logo.png")} alt=""/>
                    <span>React-cli</span>
                </Typography>
                <div className={"header-menu"}>
                    {/*{routes.map((value: RoutesConfig) => (*/}
                        {/*value.path !== '/'*/}
                            {/*? <Link key={value.path} onClick={openNewPage(value)}*/}
                            {/*>{value.name}</Link>*/}
                            {/*: null*/}
                    {/*))}*/}
                    <MenuConfig list={props.list}/>
                </div>
                <div className="header-right">
                    <Language/>
                    <Profile/>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(connect(mapPropsToState)(Header));


