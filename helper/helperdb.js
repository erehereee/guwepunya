const Pool = require('pg').Pool;

const pool = new Pool({
    host : "localhost",
    user : "pm",
    password : "mtuspan24",
    database : "power",
    port : "5432",
})

module.exports = pool;