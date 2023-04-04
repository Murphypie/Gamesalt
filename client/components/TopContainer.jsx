import React from 'react';
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';


const TopContainer = (()=>{
    const userState = useSelector(state=>state.userInfo);
    const loggedInState = useSelector(state=>state.loggedStatus);

    let welcomeDiv = (<div>
        <h1>Please Log In to Start your Journey!</h1>
    </div>);

    if(loggedInState.loggedIn){
       welcomeDiv = <div> <h1>Welcome {userState.userid}!</h1> </div>
    }
    
    return(
        <div>
            {welcomeDiv}
        </div>
    )

})

export default TopContainer