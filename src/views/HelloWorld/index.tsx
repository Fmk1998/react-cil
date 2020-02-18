import React from 'react'
import './index.scss';

class HelloWord extends React.Component {
    render(): React.ReactNode {
        return <div className="hollo-world">
            <div>Hello Word</div>
            <div>ParaView React-CLI</div>
        </div>
    }
}

export default HelloWord
