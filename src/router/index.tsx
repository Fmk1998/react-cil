import React, {Suspense, Fragment, lazy} from "react";
import {Route, Switch} from "react-router-dom";
import Loading from '../components/loading/global'

const lazyImport = (path: string) => lazy(() => import(`../views/${path}`));

// 异步渲染路由
export class DynamicRouter extends React.Component {
    render(): React.ReactNode {
        return (
            <Fragment>
                <Suspense fallback={Loading}>
                    <Switch>
                        <Route exact path="/" component={lazyImport('home/index')} />
                        {/*{renderRoutes(routes)}*/}
                        {
                            // routes.map((value: any, index: number) => (
                            //     <Route key={index} path={value[RoutesMapping.url]}
                            //            component={lazyImport('home/index')}/>
                            // ))
                        }
                    </Switch>
                </Suspense>
            </Fragment>
        );
    }
}

export default DynamicRouter;


