const db = require('../models/gameSaltModels.js');
const models = require('../models/gamesListMongo.js')
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

const SaltFactor = 5;

const userController = {};

userController.createUser = async(req, res, next) =>{
    try{
        const {userId, firstName, lastName, email, steamid} = req.body;
        let {password} = req.body;
        
        
        const queryText = `SELECT * FROM userinfo WHERE email='${email}'`
        const queryResult = await db.query(queryText);
        
        const salt = await bcrypt.genSalt(SaltFactor);
        const hash = await bcrypt.hash(password, salt);
        password = hash;
        
        const value = [userId, firstName, lastName, email, password, steamid];
        
        if(queryResult.rowCount === 0){
            const query = 'INSERT INTO userinfo (userid, first_name, last_name, email, password, steamid) values($1, $2, $3, $4, $5, $6)'
            await db.query(query, value)
            const userQuery = `SELECT _id FROM userinfo WHERE userid = $1`
            const value1 = [userId];
            const user_id = await db.query(userQuery, value1);
            res.locals = {
                user_id: user_id.rows[0]["_id"],
                steamid: steamid
            }
            return next();
        }else{
            res.send({'Status':'User Already Exists'})
        }
    }catch(err){
        return next(err)
    }
}

userController.verifyUser = async(req, res, next) =>{
    try{
        const userQuery = `SELECT userid, first_name, last_name, password, email, steamid FROM userinfo WHERE userid = $1`
        const value = [req.body.userid]
        const userValid = await db.query(userQuery, value);

        //let userValidBool;

        if(userValid.rows.length === 0){
            return res.send({'Status':'NoUser'})
        }else{
            const {userid, first_name, last_name, email, steamid, password} = userValid.rows[0];
            // await bcrypt.compare(req.body.password, userValid.rows[0].password).then(data=>{
            //     userValidBool = data;
            // });
            if(bcrypt.compareSync(req.body.password, password)){
                res.locals.userInfo = {
                    userid: userid,
                    firstName: first_name,
                    lastName: last_name,
                    email: email,
                    steamid:steamid
                }
                return next();
            }else{
                return res.send({'Status':'WrongPW'})
            }
        }
    }catch(err){
        return next(err)
    }
}

userController.getUser_id = async(req, res, next) =>{
    try{
        const userQuery = `SELECT _id, steamid FROM userinfo WHERE userid = $1`
        const value = [req.body.userid];
        const user_id = await db.query(userQuery, value);

        if(user_id.rowCount === 0){
            return res.send({"Status": "No Steam id"})
        }else{
            const {_id, steamid} = user_id.rows[0];
            res.locals.user_ids = {
                user_id: _id,
                steam_id: steamid
            }
            return next();
        }
    }catch(err){
        return next(err)
    }
}



userController.addUsersToMongo = async(req, res, next) =>{
    try{
        const ownedGamesURL = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.steamAPIkey}&steamid=${res.locals.steamid}&include_appinfo=true&format=json`;
        const {user_id, steamid} = res.locals
        const response = await fetch(ownedGamesURL, {headers: { 'Content-Type': 'application/json' }})
        const jsonResponse = await response.json();
        const gameList = JSON.stringify(jsonResponse)
        // fs.writeFileSync(
        //     path.resolve(__dirname, './../data/ownedGames.json'),
        //     gameList
        //   );
        const gameParsed = JSON.parse(gameList);
        let gameNames = gameParsed["response"]["games"]
        const output = {};
        for(let obj of gameNames){
            output[obj["appid"]] = {
                "gameName": obj['name'],
                "playedTime": obj["playtime_forever"]
            }
        }

        const toBeAddedObj = {
            userId: user_id,
            games: output
        }
        models.GamesList.create(toBeAddedObj)
        return next();
    }catch(err){
        return next(err)
    }
}


module.exports = userController;
