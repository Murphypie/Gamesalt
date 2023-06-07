const db = require('../models/gameSaltModels.js');
const models = require('../models/gamesListMongo.js')
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const gameController = {};


gameController.bulkAddFromJSON = async (req, res, next) =>{
    let data = require(path.join(__dirname,'../data/steamdb.json'))
    // data = data.map((item)=>{
    //     return{
    //         appid: item.sid,
    //         game_name: item.name,
    //         categories: `"${item.categories}"`,
    //         tags: `"${item.tags}"`,
    //         meta_score: item.meta_score,
    //         meta_uscore: item.meta_uscore,
    //         igdb_score: item.igdb_score,
    //         igdb_uscore: item.igdb_uscore
    //     }
    // })
    
        // const tmp_csvName = path.join(__dirname,'../data/steamdb.csv');
    // const tmp_csv = fs.createWriteStream(tmp_csvName);
    // //tmp_csv.write('sid, name, store_url, categories, tags, meta_score, meta_uscore, igdb_scrore, igdb_uscore \n');
    // for(const dataEntry of data){
    //     tmp_csv.write(`${dataEntry.appid}, ${dataEntry.game_name}, ${dataEntry.categories}, ${dataEntry.tags}, ${dataEntry.meta_score}, ${dataEntry.meta_uscore}, ${dataEntry.igdb_scroe}, ${dataEntry.igdb_uscore} \n`)
    // }
    // tmp_csv.end();

    const csvWriter = createCsvWriter({
        path: path.join(__dirname,'../data/steamdb.csv'),
        header:[
            {id:'appid', title: "ID"},
            {id:'game_name', title:"Game Name"},
            {id:'categories', title:"Categories"},
            {id:'tags', title:"Tags"},
            {id:'meta_score', title:"Meta Score"},
            {id:'meta_uscore', title:"Meta User Score"},
            {id:'igdb_score', title:"IGDB Score"},
            {id:"igdb_uscore", title:"IGDB User Score"}
        ]
    })


    const csvData = data.map(item=>{
        return{
            appid: item.sid,
            game_name: item.name,
            categories: `"${item.categories}"`,
            tags: `"${item.tags}"`,
            meta_score: item.meta_score,
            meta_uscore: item.meta_uscore,
            igdb_score: item.igdb_score,
            igdb_uscore: item.igdb_uscore
        }
    })

    csvWriter.writeRecords(csvData).then(()=>console.log("CSV file created"))

    // Code below doesn't work because of super user issue
    // Use the sql shell and type this
    // \copy gameinfo (appid, game_name, categories, tags, meta_score, meta_uscore, igdb_score, igdb_uscore) FROM 'D:\Coding\Projects\Gamesalt\server\data\steamdb.csv' WITH DELIMITER ',' CSV HEADER encoding 'UTF8'
    try{
        // const query = `
        // COPY gameinfo (appid, game_name, categories, tags, meta_score, meta_uscore, igdb_score, igdb_uscore) 
        // FROM '${tmp_csvName}'
        // WITH DELIMITER ',' 
        // CSV HEADER
        // `

        // await db.query(query)
        return next();
    }catch(err){
        return next(err)
    }
}


gameController.fetchGamesFromMongo = async (req, res, next) => {
    const user_id = req.params.userid;
    try{
        models.GamesList.find({userId: user_id})
        .then((data)=>{
            res.locals.gamesList = data[0];
            next();
        })
    }catch(err){
        return next(err)
    }
}

module.exports = gameController;
