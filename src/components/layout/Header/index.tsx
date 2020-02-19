import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Button,
    Menu,
    MenuItem
} from "para-ui/core"
// import {Translate} from "@material-ui/icons"
import routes from "../../../routes.config"
import {useDispatch} from "react-redux"
import {SETTING, LOGINOUT} from "../../../store/action-types"

import './index.scss';

interface Props {
    route: number[]
}

// 语言切换
const Language = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const changeLanguage = (lang: string) => {
        dispatch({
            type: SETTING,
            payload: lang
        })
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleClick} style={{color: "#ffffff"}}>
                {/*<Translate/>*/}
                <span>Language</span>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => changeLanguage("zh")}>中文</MenuItem>
                <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
            </Menu>
        </div>
    );
}

function Header() {

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        React-cli
                    </Typography>
                    <div className="">
                        <Language />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header


