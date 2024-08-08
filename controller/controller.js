const { password } = require('pg/lib/defaults');
const bcrypt = require('bcrypt');
const pool = require('../helper/helperdb');
// const mongoServices = require('../helper/helpermongo');

// const db = new mongoServices('power');
// const collection = 'data';


const UserSignUp = async (req, res) => {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const addUser = `INSERT INTO users (username, password, role) VALUES ($1,$2,$3)`
    try {
        pool.query(addUser, [username, hashPassword, role], (error, results) => {
            if(error) throw error;
            res.status(201).send("User has been added");
        })
    }
    catch {
        res.status(500).send();
    }
}

const UserLogIn = async (req, res) => {
    const {username, password} = req.body;
    const dataUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const userData = dataUser.rows.find(user => user.username === username);
        try {
            if(await bcrypt.compare(password, userData.password)) {
                res.redirect('/');
            }
            else {
                res.redirect('/login');
            }
        }
        catch {
            res.redirect('/login');
            res.status(500)
        }

}



module.exports = {
    UserSignUp,
    UserLogIn,
}