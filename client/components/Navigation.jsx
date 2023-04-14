import React from 'react';

import {Routes, Route, Link, useNavigate } from 'react-router-dom';


const Navigation = (()=>{

    let navigate = useNavigate();
    const gamedisplay = () =>{
        let path = '/gamedisplay'
        navigate(path);
    }

    const main = () =>{
        let path = '/'
        navigate(path);
    }

    return(
        <div>
            <h1>This is to be navigation</h1>
            <button onClick={main}>Main Page</button>
            <button onClick={gamedisplay}>Get Game List</button>
        </div>
    )

})

export default Navigation