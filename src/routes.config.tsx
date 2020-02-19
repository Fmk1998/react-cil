import React, {lazy} from "react";
import {Redirect} from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './views/Home/index'));
const Introduce = lazy(() => import(/* webpackChunkName: 'About' */ './views/Introduce/index'));

export interface RoutesConfig {
    path: string;
    name: string;
}

export const routes = [
    {path: "/", exact: true, name: '/', render: () => <Redirect to={"/home"}/>},
    {path: "/home", name: '首页', component: Home},
    {path: "/introduce", name: '简介', component: Introduce},
];

export default routes;
