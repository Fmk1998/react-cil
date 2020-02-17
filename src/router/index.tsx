import React from "react";
import {
    HashRouter,
    Switch
} from "react-router-dom";
import PrimaryLayout from '../components/layout/PrimaryLayout'

export default function HashRouterModel() {
    return (
        <HashRouter>
            <Switch>
                <PrimaryLayout/>
            </Switch>
        </HashRouter>
    );
}
