import React, {lazy} from "react";
import {Redirect} from "react-router-dom";

const Home = lazy(() => import(/* webpackChunkName: 'Home' */ './views/home/index'));
const About = lazy(() => import(/* webpackChunkName: 'About' */ './views/about/index'));

export enum RoutesMapping {
    key = 'id',
    path = 'menuPath',
    name = 'menuName',
    url = 'menuUrl'
}

export const routes = [
    {path: "/", exact: true, name: '/', render: () => <Redirect to={"/home"}/>},
    {path: "/home", name: '首页', component: Home},
    {path: "/about", name: '简介', component: About},
];

export default routes;
