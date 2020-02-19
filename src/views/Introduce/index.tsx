import React, {FunctionComponent} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom'


interface OwnProps extends RouteComponentProps {
}

type Props = OwnProps;

const HelloWord: FunctionComponent<Props> = (props) => {
    return (
        <div className="introduce">
           <h3>简介</h3>
        </div>
    );
};

export default withRouter(HelloWord);
