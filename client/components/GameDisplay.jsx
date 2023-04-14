import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameList from './GameList'
import Loading from './Loading';


const GameDisplay = (()=>{
    const [user_id, setUser_id] = useState("");
    const loggedInState = useSelector(state=>state.loggedStatus.loggedIn);
    const [isLoading, setIsLoading] = useState(true);

    const userState = useSelector(state=>state.userInfo);

    let notLoggedInComp = <div><h1> Please Log In and add your steam profile id!</h1></div>;
    let loggedInComp = <Loading />
  
    useEffect(()=>{
        fetchedData();
    }, [])

    const fetchedData = async () =>{
        fetch('/user/get_id',{
            method: 'POST',
            headers: {
                'Content-type': 'Application/JSON',
            },
            body: JSON.stringify({
                userid: userState.userid,
            }),
        })
        .then(res=>res.json())
        .then(data=>{
            setUser_id(data.user_id)
            setIsLoading(false)
        })
    }

    if(loggedInState && user_id.length !== 0){
        loggedInComp = <GameList user_id={user_id} />
    }

    return(
        <div>
             {loggedInState ?  loggedInComp: notLoggedInComp}
        </div>
    )

})

export default GameDisplay