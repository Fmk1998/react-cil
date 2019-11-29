import React from 'react';
import Counter from './components/Counter'

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>React</h1>
            <div>
                <Counter/>
            </div>
        </div>
    );
}

export default App;
