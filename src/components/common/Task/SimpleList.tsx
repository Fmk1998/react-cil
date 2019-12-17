import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import {Delete,Folder} from '@material-ui/icons'
import {FormattedHTMLMessage} from 'react-intl'

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
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folders">
                {props.list.length > 0
                    ? props.list.map((value: { id: string, name: string }) => (
                        <ListItem button key={value.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <Folder />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={value.name}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <Delete/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) : <FormattedHTMLMessage id={"noData"}/>}
            </List>
        </div>
    );
}
