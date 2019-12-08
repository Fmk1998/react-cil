import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {Grid, Paper} from "@material-ui/core";
import {queryData} from '../../store/actions/categoryAction'
import {FormattedHTMLMessage} from "react-intl";
import CardDashboard from '../../components/CardDashboard'
// import GridLayoutComponent from '../../components/GridLayout'
import CalendarComponent from '../../components/Calendar'
import SimpleList from "../../components/SimpleList";
import taglinkList from '../../components/common/Taglink/Taglink'

interface Props extends RouteComponentProps {
    queryData: any,
    list: []
}

interface State {

}

class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    /* 组件加载去请求数据回来 */
    componentWillMount(): void {
        this.props.queryData()
    }

    render(): React.ReactNode {
        return (
            <div className={"dashboard-layout"}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <CardDashboard content={taglinkList} title={"应用列表"}/>
                    </Grid>
                    <Grid item xs={4}>
                        <CardDashboard content={<SimpleList list={this.props.list}/>} title={"分类"}/>
                    </Grid>
                </Grid>
                {/*<GridLayoutComponent />*/}
                {/*<br/>*/}
                {/*<CalendarComponent/>*/}
            </div>
        );
    }

}

const mapStateToProps = (state: { category: object }) => {
    return state.category
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        queryData: () => {
            dispatch(queryData())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
