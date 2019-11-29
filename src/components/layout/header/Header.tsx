import React from 'react'
import {Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Tab, Tabs} from "@material-ui/core";

type Mystate = { value: number }

export class Header extends React.Component<{ route: any[] }, Mystate> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: 0
        };
        this.onChangeTab = this.onChangeTab.bind(this);
    };

    componentDidMount(): void {
        console.log(this.props)
    }

    onChangeTab(...arg: any) {
        this.setState({
            value: arg[1]
        })
    }

    render(): React.ReactNode {
        return (
            <div>
                {/*<ul>*/}
                {/*<li>*/}
                {/*<Link to="/">Home</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*<Link to="/topics">Topics</Link>*/}
                {/*</li>*/}
                {/*</ul>*/}
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Para R&D
                        </Typography>
                    </Toolbar>
                    <Tabs
                        value={this.state.value}
                        indicatorColor="primary"
                        variant="fullWidth"
                        onChange={this.onChangeTab}
                    >
                        <Tab label="Item One"/>
                        <Tab label="Item Two"/>
                        <Tab label="Item Three"/>
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}
