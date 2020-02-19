import React, {FunctionComponent} from 'react';
import Button from '@material-ui/core/Button';
import {withRouter, RouteComponentProps} from 'react-router-dom'
import './index.scss';


interface OwnProps extends RouteComponentProps {
}

type Props = OwnProps;

const HelloWord: FunctionComponent<Props> = (props) => {
    const toNewPage = () => {
        props.history.push('/about')
    }
    return (
        <div className="hollo-world">
            <div>Hello Word</div>
            <div>ParaView React-CLI</div>
            <Button
                variant="contained"
                color="primary"
                onClick={toNewPage}
            >
                跳转到关于
            </Button>
        </div>
    );
};

export default withRouter(HelloWord);
