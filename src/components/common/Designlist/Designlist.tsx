import React, {useState} from 'react'
import {RouteComponentProps, withRouter} from 'react-router';
import {connect} from 'react-redux'
import Vviewer from "v-viewer";
import {Grid, Paper, Tabs, Tab, Typography, Box} from '@material-ui/core'
import API from '../../../config/api.config'


import {getDesign} from '../../../store/actions/designAction'
import './Designlist.scss'

interface Props extends RouteComponentProps {
    getDesign?: any,
    design?: []
}

interface State {

}

interface TabPanelProps {
    children?: React.ReactNode,
    index: any,
    value: any
}

class DesignList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    componentDidMount(): void {
        this.props.getDesign()
    }

    render(): React.ReactNode {

        const list = this.props.design
        return (
            <div>
                <DesignLayout list={list}/>
            </div>
        );
    }
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    )
}


function DesignLayout(props: any) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }

    return (
        <div className={'design-list'}>
            <Grid container>
                <Tabs className={'design-tabs'} orientation="vertical" value={value} onChange={handleChange}>
                    {
                        props.list.map((item: any) => (
                            <Tab key={item.id} label={item.project}/>
                        ))
                    }
                </Tabs>
                {
                    props.list.map((item: any, index: number) => (
                        <TabPanel index={index} value={value} key={item.id}>
                            <Vviewer>
                                <Grid container spacing={3}>
                                    {
                                        JSON.parse(item.url).map((item: any) => (
                                            <Grid className={'design-cols'} item xs={3} key={item.label}>
                                                <Paper className={'design-cols-col'}>
                                                    <img src={`${API.preview}/${item.value}`} alt=""/>
                                                    <div className={'view'}>View Details</div>
                                                </Paper>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Vviewer>
                        </TabPanel>
                    ))
                }
            </Grid>
        </div>
    )
}

const mapStateToProps = (state: { design: any }) => {
    return state.design
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getDesign: () => {
            dispatch(getDesign())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignList))
