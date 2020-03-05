import React, {Suspense, Fragment, lazy, FunctionComponent} from "react";
import {Switch, Route} from "react-router-dom";
import {connect} from 'react-redux'
import Loading from '../components/loading/global'
import {ConnectedRouter} from 'connected-react-router'
// import {RoutesMapping} from "../routes.config"; // 动态路由映射枚举
import MyErrorBoundary from '../components/error/ErrorBoundary'
import {history} from '../store'

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
})

const DynamicRouter: FunctionComponent<Props> = () => {
    return (
        <Fragment>
            <MyErrorBoundary>
                <Suspense fallback={Loading}>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path="/" component={lazyImport('home/index')}/>
                            {/*{*/}
                            {/*props.list?.map((value: any, index: number) => (*/}
                            {/*<Route key={index} path={value[RoutesMapping.url]}*/}
                            {/*component={lazyImport('home/index')}/>*/}
                            {/*))*/}
                            {/*}*/}
                        </Switch>
                    </ConnectedRouter>
                </Suspense>
            </MyErrorBoundary>
        </Fragment>
    );
};

export default connect(mapStateToProps, null)(DynamicRouter);


