import React from "react";
import { useState } from "react";
import {Grid, TextField, Button, IconButton, InputAdornment} from "@mui/material";
import {useNavigate, Link} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';

const SignUp = () => {
    const [signUpInputs, setSignupInputs] = useState({
        userId: "",
        password: "",
        showPassword: false,
        firstName: "",
        lastName: "",
        email: "",
        steamid: "",
    });

    const [signUpFailBool, setsignUpFailBool] = useState(false);

    let navigate = useNavigate();

    const handleChangeSignUp = (props) => (event) => {
        setSignupInputs({ ...signUpInputs, [props]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setSignupInputs({
            ...signUpInputs,
            showPassword: !signUpInputs.showPassword,
        });
    };

    const backtoLogin = () =>{
        let path = '/login'
        navigate(path);
    }


    const addUserToDatabase = () => {
        let status;
        fetch("/user/signup", {
            method: "POST",
            headers: {
                "Content-type": "Application/JSON",
            },
            body: JSON.stringify(signUpInputs),
        }).then(res=>res.json()).then(data=>{
            if(data.Status !=="Success"){
                setsignUpFailBool(true)
            }else{
                backtoLogin();
            }
        })
        //.then(res=>res.json()).then(data=>console.log(data)) // If data came as an object - res.send({'d':'e'})
        //.then(res=>res.text()).then(data=>console.log(data)) // If data came as a string - res.send('dd')
        return;
    };

    const signUpFail = () =>{
        return(
            <div style={{color:'red'}}>
                User Already Exists
            </div>
        )
    }

    return (
        <div>
            <h1>Sign up</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={7}>
                    <TextField
                        onChange={handleChangeSignUp("userId")}
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
                        onChange={handleChangeSignUp("password")}
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
                        type={signUpInputs.showPassword ? "text":"password"}
                        required
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                        onChange={handleChangeSignUp("firstName")}
                        firstname="firstName"
                        id="firstName"
                        label="First Name"
                        required
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                        onChange={handleChangeSignUp("lastName")}
                        lastname="lastName"
                        id="lastName"
                        label="Last Name"
                        required
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                        onChange={handleChangeSignUp("email")}
                        email="email"
                        id="email"
                        label="Email Address"
                        required
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                        onChange={handleChangeSignUp("steamid")}
                        steamid="steamid"
                        id="steamid"
                        label="Steam Id"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    {signUpFailBool && signUpFail()}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        type="button"
                        onClick={addUserToDatabase}
                        variant="contained"
                        width="75%"
                    >
                        Sign Up
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default SignUp;
