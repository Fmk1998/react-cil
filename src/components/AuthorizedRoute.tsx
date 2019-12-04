import React from 'react'
import {Redirect, Route, RouteComponentProps, withRouter} from "react-router";
import {connect} from "react-redux";

interface Props extends RouteComponentProps {
    path: string,
    component?: any,
    token?: string
}

interface State {
    user: any
}

const stateToProps = (state: State) => ({
    token: state.user.access_token
})

class AuthorizedRoute extends React.Component<Props, State> {
    render(): React.ReactNode {
        const {component: Component, token, ...rest} = this.props;
        return (
            <Route {...rest} render={props => {
                return token
                    ? <Component {...props} />
                    : <Redirect to="/login"/>
            }}/>
        );
    }
}

export default withRouter(connect(stateToProps)(AuthorizedRoute))
