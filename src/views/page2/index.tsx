import React, {FunctionComponent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom'


interface OwnProps extends RouteComponentProps {
}

type Props = OwnProps;

const Page2: FunctionComponent = () => {
    return (
        <div className="page">
           <h3>Page2</h3>
        </div>
    );
};

export default withRouter(Page2);
