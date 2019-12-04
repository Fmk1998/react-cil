import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {Button} from "@material-ui/core";
import {queryData} from '../../store/actions/categoryAction'

interface Props extends RouteComponentProps {
    queryData: any
}

interface State {

}

/* TODO : 装饰器写法还有点问题,不知道怎么解决 */

// @connect(state => state,dispatch => dispatch(queryData()))

// function helloWord(target: any) {
//     console.log('hello Word!');
// }
//
// @helloWord
class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.getClick = this.getClick.bind(this)
    }

    getClick() {
        // this.props.queryData() // 出发redux的action
        console.log(this.props)
        this.props.history.push('/design')
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
                    路由跳转
                </Button>
                <Button variant="contained" color="primary" onClick={this.props.queryData}>
                    发起请求
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
// export default connect(mapStateToProps, mapDispatchToProps)(Home)
// export default withRouter(Home)
