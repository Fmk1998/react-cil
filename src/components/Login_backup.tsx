import React, {useEffect} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField,
    CssBaseline,
    Typography,
    Container,
    Grid,
    Link
} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {connect, useSelector} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
/* actions */
import {loginAction} from '../store/actions/userAction'
import '../styles/styles.scss'
import '../styles/login.scss'

interface Props extends RouteComponentProps {
    disToLogin?: any
}

interface State {
    user: any;
    username: string;
    password: string;
    showPassword: boolean;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        disToLogin: (username: string, password: string) => dispatch(loginAction(username, password))
    }
}


const LoginFormDialog = (props: Props) => {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const user = useSelector((state: State) => state.user)

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const goToRegister = () => {
        setOpen(false);
        props.history.push('/register')
    };
    const goToLogin = () => {
        props.disToLogin(values.username, values.password)
    };
    useEffect(() => {
        if (user.access_token) {
            // eslint-disable-next-line
            // props.history.push('/')
            window.location.href = `/`
        }
    }, [user.access_token])
    return (
        <div style={{backgroundColor: '#f5f5fc'}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            登录
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">登录</DialogTitle>
                <DialogContent>
                    <FormControl variant="outlined" style={{width: "100%"}}>
                        <TextField
                            label="用户名"
                            placeholder="请输入用户名"
                            multiline
                            variant="outlined"
                            onChange={handleChange('username')}
                        />
                    </FormControl>
                    <br/>
                    <FormControl variant="outlined" style={{width: "100%", marginTop: "20px"}}>
                        <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
                        <OutlinedInput
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            labelWidth={30}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <div className={"button-three"} style={{float: "right"}}>
                        <Button color="primary" onClick={goToRegister}>立即注册</Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={goToLogin} color="primary">
                        登录
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default withRouter(connect(null, mapDispatchToProps)(LoginFormDialog))
