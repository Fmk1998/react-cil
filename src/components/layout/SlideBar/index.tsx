import React, {FunctionComponent} from "react";import {RouteComponentProps, withRouter} from "react-router-dom";import {connect, useDispatch} from "react-redux";import List from "@material-ui/core/List";import ListItem from "@material-ui/core/ListItem";import ListItemIcon from "@material-ui/core/ListItemIcon";import ListItemText from "@material-ui/core/ListItemText";import "./index.scss";import StarBorder from "@material-ui/icons/StarBorder";import {makeStyles, Theme, createStyles} from "@material-ui/core/styles";import {RoutesMapping} from "../../../routes.config";import {CURRENT_MENU} from "../../../store/action-types";interface State {    menu?: {        list?: object    }}interface OwnProps extends RouteComponentProps {    list: []}type Props = OwnProps;const mapStateToProps = (state: State) => {    return {        list: state.menu?.list || []    };};const useStyles = makeStyles((theme: Theme) =>    createStyles({        root: {            width: "100%",            maxWidth: 360,            backgroundColor: theme.palette.background.paper        },        nested: {            paddingLeft: theme.spacing(4)        }    }));const SlideBar: FunctionComponent<Props> = (props) => {    const classes = useStyles();    const dispatch = useDispatch();    const [open, setOpen] = React.useState("");    const handleClick = (value: any) => () => {        if (open !== value[RoutesMapping.key]) {            setOpen(value[RoutesMapping.key]);        } else {            setOpen("");        }    };    const itemClick = (item: any) => () => {        dispatch({            type: CURRENT_MENU,            url: item[RoutesMapping.url]        });    };    return (        <List className="slide">            {props.list.map((value: any, index) => (                value.children                    ? <List component="div" disablePadding key={index}>                        {value.children.map((item: any) => (                            <ListItem button className={classes.nested} key={item.key}                                      onClick={itemClick(item)}                            >                                <ListItemIcon>                                    <StarBorder/>                                </ListItemIcon>                                <ListItemText primary={item.name}/>                            </ListItem>                        ))}                    </List>                    : null            ))}        </List>    );};export default withRouter(connect(mapStateToProps, null)(SlideBar));