import React, {Suspense} from "react";
import {renderRoutes} from "react-router-config";
import {HashRouter, Switch} from "react-router-dom";
import routes from "../routes.config";
import Loading from '../components/loading/global'

// 异步渲染路由
export class DynamicRouter extends React.Component {
    render(): React.ReactNode {
        return (
            <HashRouter>
                <Suspense fallback={Loading}>
                    <Switch>
                        {/*<Route exact path="/" component={Home}/>*/}
                        {/*<Route path="/about" component={About}/>*/}
                        {renderRoutes(routes)}
                    </Switch>
                </Suspense>
            </HashRouter>
        );
    }
}

export default DynamicRouter;


