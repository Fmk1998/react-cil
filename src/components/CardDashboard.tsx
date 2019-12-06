import React from 'react'
import {
    Avatar,
    Card, CardActions,
    CardContent,
    CardHeader,
    Collapse,
    createStyles,
    IconButton,
    makeStyles, Menu, MenuItem,
    Theme, Typography
} from "@material-ui/core";
import {lightBlue} from "@material-ui/core/colors";
import {MoreVert, ExpandMore} from '@material-ui/icons'
import {FormattedHTMLMessage} from 'react-intl'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {},
        cardHeader: {
            padding: "0.5rem"
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: lightBlue[500],
            width: '30px',
            height: '30px',
            fontSize: '1rem',
            marginLeft: '0.5rem'
        },
    }),
);

interface Props {
    title: string;
    content: any;
    showAction?: boolean;
}

export default function CardDashboard(props: Props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [expanded, setExpanded] = React.useState(false);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const changeCardDashboardStatus = () => {
        handleClose()
    };
    const {content: Component} = props;

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar sizes={"ms"} aria-label="recipe" className={classes.avatar}>R</Avatar>}
                action={
                    <div>
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVert/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={changeCardDashboardStatus}>
                                <FormattedHTMLMessage id={"cardDashboard.delete"}/>
                            </MenuItem>
                        </Menu>
                    </div>
                }
                title={props.title}
                className={classes.cardHeader}
            />
            <CardContent>
                {typeof props.content === "function"
                    ? <Component/>
                    : <div>{props.content}</div>
                }
            </CardContent>
            {props.showAction
                ? <CardActions disableSpacing>
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMore/>
                    </IconButton>
                </CardActions>
                : <span />
            }
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    chenxi
                </CardContent>
            </Collapse>
        </Card>
    );
}
