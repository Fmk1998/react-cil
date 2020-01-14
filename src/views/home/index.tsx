import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {Grid} from "@material-ui/core";
import {queryData} from '../../store/actions/categoryAction'
import {FormattedHTMLMessage} from "react-intl";
import CardDashboard from '../../components/CardDashboard'
// import GridLayoutComponent from '../../components/GridLayout'
import SimpleList from "../../components/common/Task/SimpleList";
import TaglinkList from '../../components/common/Taglink/Taglink'
import Calendar from '../../components/common/Calendar/Calendar'

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
            <div className={"dashboard-layout"} style={{padding: '25px'}}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <CardDashboard content={TaglinkList} title={"应用列表"}/>
                    </Grid>
                    <Grid item xs={4}>
                        <CardDashboard content={<SimpleList list={this.props.list}/>} title={"任务中心"}/>
                    </Grid>
                    <Grid item xs={8}>
                        <CardDashboard title={'日历'} content={<Calendar />}/>
                    </Grid>
                </Grid>
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
