import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import {Grid, Paper} from "@material-ui/core";
import CardDashboard from '../../components/CardDashboard'
import {queryData} from '../../store/actions/categoryAction'
import {FormattedHTMLMessage} from "react-intl";

interface Props extends RouteComponentProps {
    queryData: any
}

interface State {

}

const ApplicationList = () => {
    return (
        <div>
            <ul style={{display: 'flex'}}>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <FormattedHTMLMessage id={"home"}/>
            </ul>
        </div>
    )
};

class Home extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className={"dashboard-layout"}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <CardDashboard content={ApplicationList} title={"chenxi"}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>xs=4</Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

const mapStateToProps = (state: object) => {
    return state
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        queryData: () => {
            dispatch(queryData())
        }
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
