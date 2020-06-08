import React, {Suspense, Fragment, lazy, FunctionComponent} from "react";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Loading from "../components/loading/global";
import {ConnectedRouter} from "connected-react-router";
import {RoutesMapping} from "../routes.config";
import {history} from "../store";

const lazyImport = (path: string) => lazy(() => import(`../views/${path}`));

// 异步渲染路由
interface OwnProps {
    list?: []
}

type Props = OwnProps;

interface State {
    menu?: {
        threeDupMenu?: []
    }
}

const mapStateToProps = (state: State) => ({
    list: state.menu?.threeDupMenu
});

const DynamicRouter: FunctionComponent<Props> = (props) => {

    return (
        <Fragment>
            <Suspense fallback={Loading}>
                <Switch>
                    <Route exact path="/" component={lazyImport("home/index")}/>
                    <Route path="/strategy" component={lazyImport("strategy/index")}/>
                    {/*<Route exact path="/strategy/auth_level" component={lazyImport("strategy/index")}/>
                        <Route exact path="/strategy/login_factor_setting" component={lazyImport("strategy/index")}/>*/}
                    <Route path="/grafana" component={lazyImport("grafana/index")}/>

                    {/*{*/}
                    {/*props.list?.map((value: any, index: number) => (*/}
                    {/*<Route key={index} path={value[RoutesMapping.url]}*/}
                    {/*component={lazyImport('home/index')}/>*/}
                    {/*))*/}
                    {/*}*/}
                </Switch>
            </Suspense>
        </Fragment>
    );
};

export default connect(mapStateToProps, null)(DynamicRouter);


