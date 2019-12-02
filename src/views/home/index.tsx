import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button} from "@material-ui/core";
import {queryData} from '../../store/actions/category'

class Home extends React.Component<{ queryData: any }> {
    constructor(props: any) {
        super(props);
        this.getClick = this.getClick.bind(this)
    }

    getClick() {
        this.props.queryData()
    }

    componentDidMount(): void {
        /* 挂载在的时候开始请求数据 */
        // this.props.queryData()
    }

    render(): React.ReactNode {
        return (
            <div>
                Home1232
                <Button variant="contained" color="primary" onClick={this.getClick}>
                    Primary
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state: object) => {
    return state
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        queryData: () => {
            dispatch(queryData())
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
