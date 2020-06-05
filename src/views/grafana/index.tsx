/* webpackChunkName: 'strategy' */
import React, {FunctionComponent} from "react";
import Iframe from "react-iframe";
import {connect} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router-dom";
import Api from "../../config/api.config";
import "./index.scss";
import SlideBar from "../../components/layout/SlideBar";
import {Grid, TextField, Button, FormControl, InputLabel,Select, MenuItem} from "@material-ui/core";


interface OwnProps extends RouteComponentProps {

}

type Props = OwnProps;

interface State {

}

const mapStateToProps = (state: State) => {
    return {

    };
};
const Grafana: FunctionComponent<Props> = (props) => {

    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
        <div className="grafana">
            <div className="grafana-header">
                <form  noValidate autoComplete="off">
                <label>时间：</label>
                <TextField
                    id="outlined-number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    style={{width:"115px",height:"40px",padding:"0 10px"}}
                />
                <label>天前到</label>
                <TextField
                        id="outlined-number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        style={{width:"115px",height:"40px",padding:"0 10px"}}
                    />
                <label>天前</label>
                <label style={{margin:"0 0 0 20px"}}>关键字：</label>
                <TextField id="outlined-basic" variant="outlined" size="small" style={{height:"40px",padding:"0 10px"}}/>
                    <Button variant="outlined" size="small">查询</Button>
                    <label style={{margin:"0 0 0 20px"}}>刷新间隔：</label>
                    <FormControl variant="outlined" size="small">
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={age}
                            onChange={handleChange}
                            label="Age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </form>
            </div>
            <iframe id="iframe" src="http://lin.paraview.in/snackbar/package/MFAAuthentication"/>
        </div>
    );
};

export default withRouter(connect(mapStateToProps, null)(Grafana));
