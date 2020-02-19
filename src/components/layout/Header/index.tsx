import React, {FunctionComponent} from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Menu,
    MenuItem,
    IconButton
} from "@material-ui/core"
import {Translate, AccountCircle} from "@material-ui/icons"
import {useDispatch} from "react-redux"
import {RouteComponentProps, withRouter} from "react-router-dom"
import {SETTING, LOGINOUT} from "../../../store/action-types"

import './index.scss';

interface Props extends RouteComponentProps {

}

const routes = [
    {path: '/', name: 'home'},
    {path: '/about', name: 'about'}
]

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
            <Button onClick={handleClick} style={{color: "#ffffff"}}>
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

const Header: FunctionComponent<Props> = (props: Props) => {
    const gotoPage = (path: string) => {
        props.history.push(path)
    }

    return (
        <div className="header">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="header-logo">
                        React-cli
                    </Typography>
                    <div className={"header-menu"}>
                        {routes.map((value) => (
                            <Button onClick={gotoPage(value.path)} key={value.path}>{value.name}</Button>
                        ))}
                    </div>
                    <div className="header-right">
                        <Language/>
                        <Profile/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(Header);


