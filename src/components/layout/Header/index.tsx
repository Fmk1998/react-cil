import React from 'react'
import './index.scss';

interface Props {

}

interface State {
}


export default class Header extends React.Component<Props, State> {

    render(): React.ReactNode {
        return (
            <div>
                <h1>This Header</h1>
            </div>
        );
    }
}
