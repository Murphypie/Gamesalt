import React from 'react';
import { useState } from "react";
import {useNavigate, Link} from "react-router-dom";
import {Grid, TextField, Button, IconButton, InputAdornment} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = (()=>{
    const [loginInputs, setloginInputs] = useState({
        userid: "",
        password: "",
        showPassword: false,
    });

    const [loginFailStatus, setLoginFailStatus] = useState({
        loginfailbool:false,
        status: ""
    });

    let navigate = useNavigate();

    const signUp = () =>{
        let path = '/signup'
        navigate(path);
    }

    const handleChangeLogIn = (props) => (event) => {
        setloginInputs({ ...loginInputs, [props]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setloginInputs({
            ...loginInputs,
            showPassword: !loginInputs.showPassword,
        });
    };

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        // make a fetch request
        fetch('/user/login', {
          method: 'POST',
          headers: {
            'Content-type': 'Application/JSON',
          },
          body: JSON.stringify(loginInputs),
        }).then(res=>res.json()).then(data=>{
            if(data.userInfo){
                setLoginFailStatus({...loginFailStatus, loginfailbool:false, status:"Login Success"})
                console.log(data.userInfo)
            }else{
                if(data.Status === "NoUser"){
                    setLoginFailStatus({...loginFailStatus, loginfailbool:true, status:"No User Exists in the Database"})
                }else if(data.Status === "WrongPW"){
                    setLoginFailStatus({...loginFailStatus, loginfailbool:true, status:"Wrong Password"})
                }
            }
        })
    };

    const logInFail = () =>{
        return(
            <div style={{color:'red'}}>
                {loginFailStatus.status}
            </div>
        )
    }


    return(
        <div>
            <h1>Log in</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={7}>
                    <TextField
                        onChange={handleChangeLogIn("userid")}
                        userid="userid"
                        id="userid"
                        label="User ID"
                        required
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                    onChange={handleChangeLogIn("password")}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                ><VisibilityIcon/></IconButton>
                            </InputAdornment>
                        ),
                    }}
                        password="password"
                        id="password"
                        label="Password"
                        type={loginInputs.showPassword ? "text":"password"}
                        required
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    {loginFailStatus.loginfailbool && logInFail(loginFailStatus.status)}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        onClick={handleSubmitLogin}
                        type="button"
                        variant="contained"
                        width="75%"
                    >
                        Log In
                    </Button>
                </Grid>
            </Grid>
            <br></br>
            <button onClick={signUp}>Click here to create an account</button>
        </div>
    )

})

export default Login