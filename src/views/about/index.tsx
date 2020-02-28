import React, {FunctionComponent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom'


interface OwnProps extends RouteComponentProps {
}

type Props = OwnProps;

const About: FunctionComponent = () => {
    return (
        <div className="about">
           <h3>about</h3>
        </div>
    );
};

export default withRouter(About);
