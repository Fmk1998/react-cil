import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'

import {queryData} from '../../../store/actions/taglinkAction'
import mock from './mock.json'

interface Props extends RouteComponentProps {
    props: any,
    queryData: any,
    list: []
}

interface State {
    list: any
}

class taglinkList extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state)
        this.state = {
            list: mock
        }
    }

    componentDidMount(): void {
        // this.props.queryData()
    }


    render() {
        const list = this.state.list;
        return (
            <div>
               <ListItem list={list}></ListItem>
            </div>
        )
    }
}

function ListItem(props: any) {
    const item = props.list.data;
    const listItem = item.map((item:any) =>
        <li key={item.type}>
            {item.type}
        </li>
    )

    return(
        <ul>{listItem}</ul>
    )
}


const mapStateToProps = (state: { taglist: object }) => {
    return state.taglist
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        queryData: () => {
            dispatch(queryData())
        }
    }
}
export default taglinkList;

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(taglinkList))



