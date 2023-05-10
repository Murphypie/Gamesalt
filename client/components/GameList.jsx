import React from 'react';


const GameList = ((props)=>{

    //const ownedGamesURL = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.steamAPIkey}&steamid=${process.env.steamID64}&include_appinfo=true&format=json`;
    //const playerSummariesURL = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.steamAPIkey}&steamids=${process.env.steamID64}`;

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
            console.log(data);
            setUser_id(data.user_id)
            setUser_steam_id(data.steam_id)
            setIsLoading(false)
        })
    }

    const {user_id, steam_id} = props;
    return(
        <div>
            <h1>This is to be GameList</h1>
        </div>
    )

})

export default GameList