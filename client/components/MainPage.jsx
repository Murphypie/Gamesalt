import React from 'react';
import {Link} from "react-router-dom";

const MainPage = (()=>{

    return(
        <div>
            <h1>Welcome</h1>
            <Link to= "/login">Log in</Link>
        </div>
    )

})

export default MainPage