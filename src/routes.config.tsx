import React from "react";
import {Redirect} from "react-router-dom";
import Lazy from "./router/lazy"; // 懒加载模块

export const routes = [
    {path: "/", exact: true, render: () => <Redirect to={"/home"}/>},
    {path: "/home", component: Lazy(() => import('./views/HelloWorld/index'))}
];

export default routes;