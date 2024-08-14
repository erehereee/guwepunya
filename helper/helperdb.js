require("dotenv").config();
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

async function initialDBSet() {
  const bcrypt = require("bcrypt");
  const checkTablesAndConstraints = `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name IN (
      'session', 'data', 'daily', 'monthly', 
      'calculate_daily', 'calculate_monthly', 'users'
    );
    
    SELECT conname
    FROM pg_constraint
    WHERE conname IN (
      'unique_calculate_daily', 'unique_daily', 
      'unique_monthly', 'unique_calculate_monthly'
    );
  `;

  const results = await query(checkTablesAndConstraints);
  const existingTables = results[0].rows.map((row) => row.table_name);
  const existingConstraints = results[1].rows.map((row) => row.conname);

  const queries = [];

  if (!existingTables.includes("session")) {
    queries.push(`
      CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      );
      ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
      CREATE INDEX "IDX_session_expire" ON "session" ("expire");
    `);
  }

  if (!existingTables.includes("data")) {
    queries.push(`
      CREATE TABLE "data" (
        id SERIAL PRIMARY KEY,
        iadata VARCHAR(100) NOT NULL,
        ibdata VARCHAR(100) NOT NULL,
        icdata VARCHAR(100) NOT NULL,
        iavgdata VARCHAR(100) NOT NULL,
        vabdata VARCHAR(100) NOT NULL,
        vbcdata VARCHAR(100) NOT NULL,
        vcadata VARCHAR(100) NOT NULL,
        vandata VARCHAR(100) NOT NULL,
        vbndata VARCHAR(100) NOT NULL,
        vcndata VARCHAR(100) NOT NULL,
        kwhdata VARCHAR(100) NOT NULL,
        deliverydata VARCHAR(100) NOT NULL,
        receiveddata VARCHAR(100) NOT NULL,
        timestamp timestamp DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  if (!existingTables.includes("daily")) {
    queries.push(`
      CREATE TABLE "daily" (
        id SERIAL PRIMARY KEY,
        max_daily VARCHAR(100) NOT NULL,
        time_daily date
      );
    `);
  }

  if (!existingTables.includes("monthly")) {
    queries.push(`
      CREATE TABLE "monthly" (
        id SERIAL PRIMARY KEY,
        max_monthly VARCHAR(100) NOT NULL,
        time_monthly date
      );
    `);
  }

  if (!existingTables.includes("calculate_daily")) {
    queries.push(`
      CREATE TABLE "calculate_daily" (
        id SERIAL PRIMARY KEY,
        data_daily VARCHAR(100) NOT NULL,
        timestamp date
      );
    `);
  }

  if (!existingTables.includes("calculate_monthly")) {
    queries.push(`
      CREATE TABLE "calculate_monthly" (
        id SERIAL PRIMARY KEY,
        data_monthly VARCHAR(100) NOT NULL,
        timestamp date
      );
    `);
  }

  if (!existingTables.includes("users")) {
    queries.push(`
      CREATE TABLE "users" (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  if (!existingConstraints.includes("unique_daily")) {
    queries.push(
      `ALTER TABLE daily ADD CONSTRAINT unique_daily UNIQUE (time_daily);`
    );
  }

  if (!existingConstraints.includes("unique_monthly")) {
    queries.push(
      `ALTER TABLE monthly ADD CONSTRAINT unique_monthly UNIQUE (time_monthly);`
    );
  }

  if (!existingConstraints.includes("unique_calculate_daily")) {
    queries.push(
      `ALTER TABLE calculate_daily ADD CONSTRAINT unique_calculate_daily UNIQUE (timestamp);`
    );
  }

  if (!existingConstraints.includes("unique_calculate_monthly")) {
    queries.push(
      `ALTER TABLE calculate_monthly ADD CONSTRAINT unique_calculate_monthly UNIQUE (timestamp);`
    );
  }

  try {
    if (queries.length > 0) {
      await query(queries.join(" "));
      console.log("New tables and constraints have been created.");
    } else {
      console.log("All tables and constraints already exist.");
    }

    // Insert 2 users if they don't exist
    const checkUsers = `
      SELECT username FROM users WHERE username IN ('admin', 'operator');
    `;
    const userResults = await query(checkUsers);

    if (userResults.rows.length === 0) {
      const hashPasswordAdmin = await bcrypt.hash(
        process.env.BASIC_PASS_ADMIN,
        10
      );
      const hashPasswordOP = await bcrypt.hash(process.env.BASIC_PASS_OP, 10);
      const insertUsers = `
        INSERT INTO users (username, password, role)
        VALUES 
          ('admin', ${hashPasswordAdmin}, 'ADMIN'),
          ('operator', ${hashPasswordOP}, 'OPERATOR');
      `;
      await query(insertUsers);
      console.log("New users have been added to 'users' table.");
    } else {
      console.log("Users already exist in 'users' table.");
    }
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

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
  initialDBSet,
};
