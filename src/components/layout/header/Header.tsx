import React from 'react'
import {Link} from "react-router-dom";
import {Button, Typography, Toolbar, AppBar, IconButton} from "@material-ui/core";
import {AccountCircle} from '@material-ui/icons';

type Mystate = { value: number }

export class Header extends React.Component<{ route: any[] }, Mystate> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 0,
        };
    };

    componentDidMount(): void {
    }


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
