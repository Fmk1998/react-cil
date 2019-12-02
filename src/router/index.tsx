import React from "react";
import {
    HashRouter,
    Switch
} from "react-router-dom";
import {Header} from '../components/layout/header/Header'
import {Main} from '../components/layout/main/Main'
import Home from '../views/home'
import {Design} from '../views/design'

const router = [
    {path: '/', name: '首页', component: Home},
    {path: '/design', name: '设计', component: Design},
];
export default function HashRouterModel() {
    return (
        <HashRouter>
            <div>
                <Header route={router}/>
                <Switch>
                    <Main route={router}/>
                </Switch>
            </div>
        </HashRouter>
    );
}
