import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GameViewComp from './GameViewComp';

const GameList = ((props)=>{
    const {user_id, steam_id} = props;
    const [loading, setLoading] = useState(true);

    let gamesOutput = {};
    const fetchGames = async () =>{
        fetch(`game/gameFetch/${user_id}`,{
            method: "GET",
            headers: {
                'Content-Type': 'Application/JSON'
              }
        })
        .then(res=>res.json())
        .then(data=>{
            gamesOutput = data["gamesList"]["games"]
            setLoading(false);
        })
    }

    useEffect(()=>{
        fetchGames();
    }, [])

    if(!loading){
        <GameViewComp />
    }

    return(
        <div>
            <button onClick={fetchGames}>Click here to refresh</button>
            <h1>This is to be GameList</h1>
        </div>
    )

})

export default GameList