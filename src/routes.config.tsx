import React, {lazy} from "react";
import {Redirect} from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './views/HelloWorld/index'));
const About = lazy(() => import(/* webpackChunkName: 'About' */ './views/HelloWorld/about'));

export interface RoutesConfig {
    path: string;
    name: string;
}

export const routes = [
    {path: "/", exact: true, name: '/', render: () => <Redirect to={"/home"}/>},
    {path: "/home", name: '首页', component: Home},
    {path: "/about", name: '关于', component: About},
];

export default routes;
