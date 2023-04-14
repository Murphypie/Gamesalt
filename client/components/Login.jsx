import React from 'react';
import { useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import {useNavigate, Link} from "react-router-dom";
import {Grid, TextField, Button, IconButton, InputAdornment} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {loginReducer} from '../slices/userInfoSlice'
import {loggedInReducer} from '../slices/loggedStatusSlice';

const Login = (()=>{
    const useridRef = useRef();
    const passwordRef = useRef();
    const [showPassword, setShowPassword] = useState(false);

    const [loginFailStatus, setLoginFailStatus] = useState({
        loginfailbool:false,
        status: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signUp = () =>{
        let path = '/signup'
        navigate(path);
    }

    const loginSuccess = () =>{
        let path = '/'
        navigate(path);
    }


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        // make a fetch request
        fetch('/user/login', {
          method: 'POST',
          headers: {
            'Content-type': 'Application/JSON',
          },
          body: JSON.stringify({
            userid: useridRef.current.value,
            password: passwordRef.current.value
        }),
        }).then(res=>res.json()).then(data=>{
            if(data.userInfo){
                setLoginFailStatus({...loginFailStatus, loginfailbool:false, status:"Login Success"})
                dispatch(loginReducer(data.userInfo))
                dispatch(loggedInReducer(true))
                loginSuccess();
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
                        inputRef={useridRef}
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
                    inputRef={passwordRef}
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
                        type={showPassword ? "text":"password"}
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
                        width="75%">
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