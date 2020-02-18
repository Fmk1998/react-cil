import React from 'react'
import './index.scss';
import Router from "../../../router";

export default class Main extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="main">
                <Router/>
            </div>
        );
    }
}