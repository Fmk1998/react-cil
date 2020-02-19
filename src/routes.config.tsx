import React, {lazy} from "react";
import {Redirect} from "react-router-dom";
// import Lazy from "./router/lazy"; // 懒加载模块

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './views/HelloWorld/index'));
const About = lazy(() => import(/* webpackChunkName: 'About' */ './views/HelloWorld/about'));

export const routes = [
    {path: "/", exact: true, render: () => <Redirect to={"/home"}/>},
    // {path: "/home", component: Lazy(() => import('./views/HelloWorld/index'))},
    {path: "/home", component: Home},
    {path: "/about", component: About},
];

export default routes;
