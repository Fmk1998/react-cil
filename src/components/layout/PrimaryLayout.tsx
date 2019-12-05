import React from 'react'
import {Switch} from 'react-router-dom'
import Header from "./header/Header";
import {Main} from "./main/Main";
import Home from "../../views/home";
import {Design} from "../../views/design";

const router = [
    {path: '/', name: '首页', component: Home},
    {path: '/design', name: '设计', component: Design},
];

const PrimaryLayout = () => {
    return (
        <div className="primary-router">
            <Header route={router}/>
            <main>
                <Switch>
                    <Main route={router}/>
                </Switch>
            </main>
        </div>
    )
}

export default PrimaryLayout
