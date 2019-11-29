import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import {Header} from '../components/layout/header/Header'

const router = [
    {path: '/', component: () => import('../views/home')},
    {path: '/design', component: () => import('../views/design')},
];
export default function HashRouterModel() {
    return (
        <Router>
            <div>
                <Header  route={router}/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/topics">
                        <Topics/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}

function Topics() {
    let {path, url} = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${path}/:topicId`}>
                    <Topic/>
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let {topicId} = useParams();

    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
}
