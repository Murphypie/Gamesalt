const db = require('../models/gameSaltModels.js');
const bcrypt = require('bcrypt');

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

module.exports = userController;
