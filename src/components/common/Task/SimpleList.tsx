import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography
} from "@material-ui/core";
import {ExpandMoreSharp,PlaylistPlay} from '@material-ui/icons'
import {FormattedHTMLMessage} from 'react-intl'
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

                            <Typography>{task.name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                {
                                    JSON.parse(task.annex).map((docs: { label: string, value: string }) => (
                                        <ListItem key={docs.label}>
                                            <ListItemAvatar>
                                                <Avatar/>
                                            </ListItemAvatar>
                                            <ListItemText primary={docs.value}/>
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
