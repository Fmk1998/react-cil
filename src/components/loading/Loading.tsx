import React, {FunctionComponent, Fragment, useEffect} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom'
import {connect} from 'react-redux'

declare let window: Window & {
    NProgress: any
};

interface OwnProps extends RouteComponentProps {
    loading?: {
        loading?: boolean
    }
}

interface State {
    loading: boolean
}

type Props = OwnProps;
const mapStateToProps = (state: State) => {
    return {
        loading: state.loading
    }
}
const Loading: FunctionComponent<Props> = (props) => {
    useEffect(() => {
        if (props.loading?.loading) {
            if (window.NProgress) {
                window.NProgress.start()
            }
        } else {
            if (window.NProgress) {
                window.NProgress.done()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.loading?.loading]);

    return (
        <Fragment></Fragment>
    );
};

export default withRouter(connect(mapStateToProps, null)(Loading));
