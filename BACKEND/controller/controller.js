const bcrypt = require("bcrypt");
const { query } = require("../helper/helperdb");
// const mongoServices = require('../helper/helpermongo');

// const db = new mongoServices('power');
// const collection = 'data';

const UserSignUp = async (req, res) => {
  const { username, password, role } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const queryDB = `INSERT INTO users (username, password, role) VALUES ($1,$2,$3)`;
  try {
    const addUser = await query(queryDB, [username, hashPassword, role]);
    if (addUser) {
      res.status(201).send("User has been Added");
    } else {
      res.status(403).send("Failed to add User");
    }
  } catch {
    res.status(500).send();
  }
};

const UserLogIn = async (req, res) => {
  const { username, password } = req.body;
  const dataUser = await query(
    "SELECT * FROM users WHERE username = $1 LIMIT 1",
    [username]
  );
  const userData = dataUser.rows.find((user) => user.username === username);
  try {
    if (await bcrypt.compare(password, userData.password)) {
      req.session.isAuth = true;
      req.session.user = userData.username;
      res.status(202).json({ message: "Login Successfuly" });
    } else {
      res.status(202).json({ message: "User not found" });
    }
  } catch {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const UserLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ message: "Error logging out." });
    }
    res.send({ message: "Logout Successfuly" });
  });
};

module.exports = {
  UserSignUp,
  UserLogIn,
  UserLogout,
};
