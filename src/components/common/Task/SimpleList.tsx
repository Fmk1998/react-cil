import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography
} from "@material-ui/core";
import {ExpandMoreSharp, Subject} from '@material-ui/icons'
import {FormattedHTMLMessage} from 'react-intl'
import API from '../../../config/api.config'
import './Task.scss'

interface Props {
    list: []
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export default function SimpleList(props: Props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<number | false>(0);

    const handleChange = (panel: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div className={classes.root}>
            {props.list.length > 0
                ? props.list.map((task: { id: string, name: string, annex: string }, index: number) => (
                    <ExpansionPanel expanded={expanded === index} onChange={handleChange(index)} key={task.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreSharp/>} className="task-header">
                            <Avatar className={[`icon-${index}`, "icon"].join(' ')}>
                                <Subject fontSize="small"/>
                            </Avatar>
                            <Typography className="task-header-text">{task.name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="task-content">
                            <List>
                                {
                                    JSON.parse(task.annex).map((docs: { label: string, value: string, startTime: string, endTime: string }) => (
                                        <ListItem key={docs.label}>
                                            <ListItemAvatar>
                                                <Avatar/>
                                            </ListItemAvatar>
                                            {/*<ListItemText primary={`${API.preview}/${docs.value}`}/>*/}
                                            <ListItemText primary={docs.label} secondary={docs.startTime}/>
                                            <ListItemSecondaryAction>
                                                <span className="open">open</span>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </List>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
                : <FormattedHTMLMessage id={"noData"}/>
            }
        </div>
    )
}
