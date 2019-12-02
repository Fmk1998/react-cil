import React from 'react'
import {Route} from 'react-router-dom'

export class Main extends React.Component<{ route: any }> {
    render(): React.ReactNode {
        return (
            <div>
                {
                    this.props.route.map((value: { path: string; name: string; component: any }) => {
                        if (value.path === '/') {
                            return (
                                <Route exact
                                       path={value.path}
                                       key={value.path}
                                       component={value.component}
                                />
                            )
                        } else {
                            return (
                                <Route
                                    path={value.path}
                                    key={value.path}
                                    component={value.component}
                                />
                            )
                        }
                    })
                }
            </div>
        );
    }
}
