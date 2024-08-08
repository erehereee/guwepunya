const Pool = require('pg').Pool;
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const pool = new Pool({
    host : "localhost",
    user : "postgres",
    password : "root",
    database : "postgres",
    port : "5432",
})

const sessionDB = expressSession({
    store: new pgSession({
      pool : pool,                // Connection pool
      tableName : 'session'   // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: 'hello world',
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized : false
  });

const query = async (query, data) => {
    const results = await pool.query(query, data);
    return results;
}

module.exports = {
    pool,
    sessionDB,
    query
}