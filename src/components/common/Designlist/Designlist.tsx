import React, {useState} from 'react'
import {RouteComponentProps, withRouter} from 'react-router';
import {connect} from 'react-redux'
import {Grid, Paper, Tabs, Tab, Typography, Box} from '@material-ui/core'
import API from '../../../config/api.config'
import {getDesign} from '../../../store/actions/designAction'
// import 'react-fancybox/lib/fancybox.css'
import './Designlist.scss'
// import Viewer from 'v-viewer' // 你是个神仙，React里面用Vue，再w我下的就是VUE，你再搭配歌Angular，他自己就是VUe
import Viewer from '../../Viewer'
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
    };

    return (
        <div className={'design-list'}>
            <Grid container>
                <Tabs className={'design-tabs'} orientation="vertical" value={value} onChange={handleChange}>
                    {
                        props.list.map((item: any, index: number) => (
                            <Tab className={`bgColor-${index%props.list.length}`} key={item.id} label={`${item.project}[${item.version}]`}/>
                        ))
                    }
                </Tabs>
                {
                    props.list.map((item: any, index: number) => (
                        <TabPanel index={index} value={value} key={item.id}>
                            <Grid container spacing={3}>
                                <Viewer images={JSON.parse(item.url)}/>
                            </Grid>
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
