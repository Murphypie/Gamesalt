const express = require('express');
const router = express.Router();

const createTableController = require('../controllers/createTableController')

router.get(
    '/createUserTable', 
    createTableController.userInfoTable, 
    (req,res)=>{
        res.status(200).send('Userinfo table Created')
    }
)

router.get(
    '/createGameTable', 
    createTableController.gameInfoTable, 
    (req,res)=>{
        res.status(200).send('Gameinfo table Created')
    }
)


module.exports = router;