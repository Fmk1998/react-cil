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
    disToLogin: any
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

function LoginForm(props: Props) {
    const [value, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false
    })
    const user = useSelector((state: State) => state.user)
    const handleChange = (props: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...value, [props]: event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({...value, showPassword: !value.showPassword})
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    // const goToRegister = () => {
    //     props.history.push('/register')
    // }

    const goToLogin = () => {
        props.disToLogin(value.username, value.password)
    }

    useEffect(() => {
        if (user.access_token) {
            window.location.href = `/`
        }
    }, [user.access_token])

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg">
                <Typography component="div" style={{height: '100vh'}}>
                    <Grid container>
                        <Grid item xs={4} style={{backgroundColor: '#fff'}}>
                            <div className="login-form-logo">
                                <img src={require('../assets/logo.png')} width='40' height='40'/><h3>Para-Portal</h3>
                            </div>
                            <div className="login-form-item">
                                <div className="login-form-title">
                                    <Typography variant="h5">
                                        Log in
                                    </Typography>
                                    <Link href="#">Sign Up</Link>
                                </div>
                                <FormControl>
                                    <TextField
                                        label="用户名"
                                        placeholder="请输入用户名"
                                        variant="outlined"
                                        onChange={handleChange('username')}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="outlined-adornment-password">密码</InputLabel>
                                    <OutlinedInput
                                        type={value.showPassword ? 'text' : 'password'}
                                        value={value.password}
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
                                                    {value.showPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div className="login-form-btn">
                                <Button onClick={goToLogin} className="btn-login">Log in</Button>
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{backgroundColor: '#364fcc'}}>

                        </Grid>
                    </Grid>
                </Typography>
            </Container>
        </React.Fragment>
    )
}

export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
