import React from "react";
import {
    HashRouter, Redirect,
    Route,
    Switch
} from "react-router-dom";
import AuthorizedRoute from '../components/AuthorizedRoute'
import Login from '../components/Login'
import Register from '../components/Register'
import PrimaryLayout from '../components/layout/PrimaryLayout'

export default function HashRouterModel() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <AuthorizedRoute path="/" component={PrimaryLayout}/>
                <Redirect to="/login"/>
            </Switch>
        </HashRouter>
    );
}
