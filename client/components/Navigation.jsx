import React from 'react';

import {Routes, Route, Link, useNavigate } from 'react-router-dom';


const Navigation = (()=>{

    let navigate = useNavigate();
    const gameList = () =>{
        let path = '/gamelist'
        navigate(path);
    }

    return(
        <div>
            <h1>This is to be navigation</h1>
            <button onClick={gameList}>Get Game List</button>
        </div>
    )

})

export default Navigation