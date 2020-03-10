/* webpackChunkName: 'home' */
import React, {FunctionComponent} from "react";
import Iframe from "react-iframe";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Api from "../../config/api.config";
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
        <div className="home-iframe">
            <span>{props.currentMenu}</span>
            {/*{*/}
            {/*props.currentMenu*/}
            {/*? <Iframe url={`${Api.iframeUrl}${props.currentMenu}`}*/}
            {/*id="myId"*/}
            {/*className="common-iframe-wallpaper"*/}
            {/*display="inline"*/}
            {/*sandbox="allow-same-origin"*/}
            {/*position="relative"/>*/}
            {/*: <span>页面跑丢了,需要添加后续逻辑</span>*/}
            {/*}*/}
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Home));
