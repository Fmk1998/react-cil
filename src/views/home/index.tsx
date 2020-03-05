import React, {FunctionComponent} from "react";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
// import Api from '../../config/api.config'
import "./index.scss";


interface OwnProps extends RouteComponentProps {
    currentMenu?: string
}

type Props = OwnProps;

interface State {
    menu?: {
        currentMenu?: string
    }
}

const mapStateToProps = (state: State) => {
    return {
        currentMenu: state.menu?.currentMenu
    };
};
const Home: FunctionComponent<Props> = (props) => {
    return (
        <div className="common-iframe">
            {
                props.currentMenu
                    ? <span>{props.currentMenu}</span>
                    : <span>页面跑丢了,需要添加后续逻辑</span>
            }
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Home));
