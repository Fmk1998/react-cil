import React from "react";
import {renderRoutes} from "react-router-config";
import {HashRouter, Redirect} from "react-router-dom";
import routes from "../routes.config";

// 异步渲染路由
export class DynamicRouter extends React.Component {
    render(): React.ReactNode {
        return (
            <HashRouter>
                {renderRoutes(routes)}
            </HashRouter>
        );
    }
}

export default DynamicRouter;


