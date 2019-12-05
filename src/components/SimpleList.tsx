import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {List, ListItem, ListItemText} from "@material-ui/core";

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
const renderList = (list: []) => {
    return list.map((value: { id: string, name: string }) => (
        <ListItem button key={value.id}>
            <ListItemText primary={value.name}/>
        </ListItem>))
}
export default function SimpleList(props: Props) {
    const classes = useStyles();
    console.log("props:", props)
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="secondary mailbox folders">
                {props.list.length > 0 ? renderList(props.list) : <span>暂无数据</span>}
            </List>
        </div>
    );
}
