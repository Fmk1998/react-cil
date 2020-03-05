import React, {Suspense, lazy, FunctionComponent} from "react";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import Loading from "../components/loading/global";
import {ConnectedRouter} from "connected-react-router";
// import {RoutesMapping} from "../routes.config"; // 动态路由映射枚举

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

const DynamicRouter: FunctionComponent<Props> = () => {
    return (

        <Suspense fallback={Loading}>
            <Switch>
                <Route exact path="/" component={lazyImport('home/index')}/>
            </Switch>
        </Suspense>
    );
};

export default connect(mapStateToProps, null)(DynamicRouter);


