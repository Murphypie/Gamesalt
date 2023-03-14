const express = require('express');
const router = express.Router();

const createTableController = require('../controllers/createTableController')

router.get(
    '/', 
    createTableController.userInfoTable, 
    (req,res)=>{
        res.status(200).send('Userinfo table Createed')
    }
)

module.exports = router;