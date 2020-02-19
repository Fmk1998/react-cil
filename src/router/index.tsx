import React, {Suspense, Fragment} from "react";
import {renderRoutes} from "react-router-config";
import {Switch} from "react-router-dom";
import routes from "../routes.config";
import Loading from '../components/loading/global'

// 异步渲染路由
export class DynamicRouter extends React.Component {
    render(): React.ReactNode {
        return (
            <Fragment>
                <Suspense fallback={Loading}>
                    <Switch>
                        {renderRoutes(routes)}
                    </Switch>
                </Suspense>
            </Fragment>
        );
    }
}

export default DynamicRouter;


