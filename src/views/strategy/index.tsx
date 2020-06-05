/* webpackChunkName: 'strategy' */
import React, {FunctionComponent,useEffect} from "react";
import Iframe from "react-iframe";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Api from "../../config/api.config";
import "./index.scss";
import SlideBar from "../../components/layout/SlideBar";


interface OwnProps extends RouteComponentProps {

}

type Props = OwnProps;

interface State {

}

const mapStateToProps = (state: State) => {
    return {

    };
};
const Strategy: FunctionComponent<Props> = (props) => {

    useEffect(()=>{
        console.log(props.location)
    },[]);

    return (
        <div className="strategy">
            <SlideBar sideList={[]}/>
            <iframe id="iframe" src="http://lin.paraview.in/snackbar/package/MFAAuthentication"/>
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Strategy));
