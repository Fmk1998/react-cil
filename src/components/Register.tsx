import React from 'react';
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
    TextField
} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";
/* actions */
import {registerAction} from '../store/actions/userAction'

interface Props extends RouteComponentProps {

}

interface State {
    username: string;
    password: string;
    showPassword: boolean;
}

const mapStateToProps = (state: any) => {
    return state.user
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        disToRegister: (username: string, password: string) => dispatch(registerAction(username, password))
    }
}


const RegisterFormDialog = (props: Props) => {
    const [open, setOpen] = React.useState(true);
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
    });
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
    const goToLogin = () => {
        setOpen(false)
        props.history.push('/login')
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                注册
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">注册</DialogTitle>
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
                            labelWidth={100}
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
                        <span>已有账号？</span>
                        <Button color="primary" onClick={goToLogin}>立即登录</Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        注册
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterFormDialog))
