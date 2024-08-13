require('dotenv').config()
const Pool = require("pg").Pool;
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);

const pool = new Pool({
  host: process.env.SQL_LOCALHOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  port: process.env.SQL_PORT,
});

async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log("Database Connection Success");
    client.release();
    return true;
  } catch (err) {
    console.log("Database Connection Error : ", err);
    return false;
  }
}

const query = async (query, data) => {
  const results = await pool.query(query, data);
  return results;
};

async function createDB() {
  const queryGetInfo =
    "SELECT * from information_schema.tables WHERE table_name = 'session'";
  const results = await query(queryGetInfo);
  const ifExits = results.rows[0];
  try {
    if (!ifExits) {
      const queryCreate = `CREATE TABLE "session" (
                      "sid" varchar NOT NULL COLLATE "default",
                      "sess" json NOT NULL,
                      "expire" timestamp(6) NOT NULL)
                      WITH (OIDS=FALSE);

                      ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

                      CREATE INDEX "IDX_session_expire" ON "session" ("expire");`;
      await query(queryCreate);
      console.log("New Table database has been created");
    } else {
      console.log("Database Already Exist");
    }
  } catch (err) {
    console.log("Error creating table : ", err);
  }
}

createDB();

const sessionDB = expressSession({
  store: new pgSession({
    pool: pool,
    tableName: "session",
  }),

  secret: "hello world",
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  saveUninitialized: false,
});

module.exports = {
  sessionDB,
  query,
  checkConnection,
};
