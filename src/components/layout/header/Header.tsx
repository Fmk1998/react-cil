import React from 'react'
import {Link} from "react-router-dom";
import {Button, Typography, Toolbar, AppBar, IconButton, Menu, MenuItem} from "@material-ui/core";
import {AccountCircle, Translate} from '@material-ui/icons';

interface MyProps {
    route: any[]
}

interface MyState {
}

const Language = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                <MenuItem onClick={handleClose}>中文</MenuItem>
                <MenuItem onClick={handleClose}>English</MenuItem>
            </Menu>
        </div>
    );
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
                        <div>
                            <Language/>
                        </div>
                        <div className={"right-menu"}>
                            <IconButton aria-label="profile" color="inherit">
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
