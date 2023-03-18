const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = `postgres://${process.env.databaseUserName}:${process.env.databasePassword}@isilo.db.elephantsql.com/${process.env.databaseUserName}`;

const pool = new Pool({
    connectionString: PG_URI,
  });

module.exports = {
query: (text, params, callback) => {
    //console.log('executed query', text);
    return pool.query(text, params, callback);
    },
};