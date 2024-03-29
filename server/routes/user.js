const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js')


router.post('/login', userController.verifyUser, (req, res)=>{
    res.send(res.locals)}   
)

router.post('/signup', userController.createUser, userController.addUsersToMongo, (req, res)=>{
    res.send({'Status':'Success'})}   
)

router.post('/get_id', userController.getUser_id, (req, res)=>{
    res.send(res.locals.user_ids)}
)


module.exports = router;