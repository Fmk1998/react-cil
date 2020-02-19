import React from 'react'
import {AppBar} from "para-ui/core"

import './index.scss';

interface Props {
    route: number[]
}

interface State {

}


export default class Header extends React.Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render(): React.ReactNode {
        return (
            <div>
                <h1>This Header</h1>
            </div>
        );
    }
}
