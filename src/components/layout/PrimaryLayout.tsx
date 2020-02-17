import React from 'react'
import {Switch} from 'react-router-dom'
import Header from "./header/Header";
import {Main} from "./main/Main";

const PrimaryLayout = () => {
    return (
        <div className="primary-router">
            <Header />
            <main>
                <Switch>
                    <Main />
                </Switch>
            </main>

        </div>
    )
}

export default PrimaryLayout
