const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoPassword}@usergamelist.5nw0kbt.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of. Specifies which database to connect to
    dbName: 'UserGameList'
  }).then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gameName: String,
    playedTime: Number
})

const gamesListSchema = new Schema({
    userId: String,
    games:{
        type:Map,
        of: gameSchema
    }
})

const GamesList = mongoose.model('gameslist', gamesListSchema)

module.exports = {
    GamesList,
  };