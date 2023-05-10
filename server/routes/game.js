const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController')

router.get(
    '/bulkAdd', 
    gameController.bulkAddFromJSON, 
    (req,res)=>{
        res.status(200).send('Game bulk added')
    }
)



module.exports = router;