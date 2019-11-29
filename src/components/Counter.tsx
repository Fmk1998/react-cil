import React from "react";
import {connect} from 'react-redux'

class Counter extends React.Component<{ counter: any }> {
    constructor(props: Readonly<{ counter: any; }>) {
        super(props);
        this.state = {
            counter: 0
        }
    };

    handlerChange() {
        console.log(this)
        // @ts-ignore
        this.props.dispatch({type: 'INCREMENT'})
    };

    render() {
        return (
            <div>
                <p>{this.props.counter}</p>
                <button onClick={() => this.handlerChange()}>click</button>
            </div>
        );
    }
}

const mapStateToProps = (state: { counter: any; }) => {
    return {
        counter: state.counter
    }
}
export default connect(mapStateToProps)(Counter)
