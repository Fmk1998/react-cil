import React, {FunctionComponent, Fragment, useEffect} from "react"import {RouteComponentProps, withRouter, useLocation} from 'react-router-dom'import {connect, useDispatch} from 'react-redux'import Drawer from "@material-ui/core/Drawer"import List from "@material-ui/core/List"import ListItem from "@material-ui/core/ListItem"import ListItemIcon from "@material-ui/core/ListItemIcon"import ListItemText from "@material-ui/core/ListItemText"import "./index.scss"import Collapse from "@material-ui/core/Collapse"import ExpandLess from '@material-ui/icons/ExpandLess';import ExpandMore from '@material-ui/icons/ExpandMore';import StarBorder from '@material-ui/icons/StarBorder';import InboxIcon from '@material-ui/icons/MoveToInbox';import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';import {RoutesMapping} from "../../../routes.config";import {CURRENT_MENU, LOADING} from "../../../store/action-types";import {sequlizeURL} from "../../../utils/echo";interface State {    menu?: {        sideList?: object[],        hashMenuMapping?: object    }}interface OwnProps extends RouteComponentProps {    sideList: Array<any>,    hashMenuMapping?: any}type Props = OwnProps;const mapStateToProps = (state: State) => {    return {        sideList: state.menu?.sideList || [],        hashMenuMapping: state.menu?.hashMenuMapping    }}const useStyles = makeStyles((theme: Theme) =>    createStyles({        root: {            width: '100%',            maxWidth: 360,            backgroundColor: theme.palette.background.paper,        },        nested: {            paddingLeft: theme.spacing(4),        },    }),);const SlideBar: FunctionComponent<Props> = (props) => {    const classes = useStyles();    const [open, setOpen] = React.useState('');    const location = useLocation()    const handleClick = (value: any) => () => {        if (open !== value[RoutesMapping.key]) {            setOpen(value[RoutesMapping.key])        } else {            setOpen('')        }    };    const itemClick = (item: any) => () => {        let url = sequlizeURL(item[RoutesMapping.url]);        props.history.push(url)    };    useEffect(() => {        if ((Object.keys(props.hashMenuMapping)).length            && props.hashMenuMapping[location.pathname]            && (props.hashMenuMapping[location.pathname]).key        ) {            setOpen((props.hashMenuMapping[location.pathname]).key)        }    }, [props]);    return (        <Drawer className="slide" variant="permanent">            <List aria-labelledby="nested-list-subheader">                {props.sideList.map((value: any, index) => (                    value.children                        ? <Fragment key={index}>                            <ListItem button onClick={handleClick(value)}>                                <ListItemIcon><InboxIcon/></ListItemIcon>                                <ListItemText primary={value[RoutesMapping.name]}/>                                {open === value[RoutesMapping.key] ? <ExpandLess/> : <ExpandMore/>}                            </ListItem>                            <Collapse in={open === value[RoutesMapping.key]} timeout="auto" unmountOnExit>                                <List component="div" disablePadding>                                    {value.children.map((item: any) => (                                        <ListItem key={item[RoutesMapping.key]} button className={classes.nested}                                                  onClick={itemClick(item)}                                        >                                            <ListItemIcon>                                                <StarBorder/>                                            </ListItemIcon>                                            <ListItemText primary={item[RoutesMapping.name]}/>                                        </ListItem>                                    ))}                                </List>                            </Collapse>                        </Fragment>                        : <div key={index}>没有子菜单</div>                ))}            </List>        </Drawer>    )}export default withRouter(connect(mapStateToProps, null)(SlideBar));