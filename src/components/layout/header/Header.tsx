import React from 'react'
import {Link} from "react-router-dom";
import {Button, Typography, Toolbar, AppBar, IconButton, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, Translate} from '@material-ui/icons';
import {useDispatch} from "react-redux";
import {LOGINOUT, SETTING} from '../../../store/action-types'

interface MyProps {
    route: any[]
}

interface MyState {
}

const Language = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const changeApplicationLanguage = (val: string) => {
        dispatch({type: SETTING, payload: val});
        handleClose()
    };
    return (
        <div>
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
                <MenuItem onClick={() => changeApplicationLanguage("zh")}>中文</MenuItem>
                <MenuItem onClick={() => changeApplicationLanguage("en")}>English</MenuItem>
            </Menu>
        </div>
    );
}

const Profile = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const loginOut =() => {
        dispatch({type: LOGINOUT})
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

export default class Header extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
    };

    render(): React.ReactNode {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Para R&D
                        </Typography>
                        <div className={"route-menu"}>
                            {this.props.route.map(value => (
                                <Button key={value.path}>
                                    <Link to={value.path}>{value.name}</Link>
                                </Button>
                            ))}
                        </div>
                        <div className={"right-menu"}>
                            <Language/>
                            <Profile/>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
