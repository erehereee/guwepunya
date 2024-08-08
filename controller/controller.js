const bcrypt = require('bcrypt');
const {query, pool} = require('../helper/helperdb');
// const mongoServices = require('../helper/helpermongo');

// const db = new mongoServices('power');
// const collection = 'data';


const UserSignUp = async (req, res) => {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const queryDB = `INSERT INTO users (username, password, role) VALUES ($1,$2,$3)`
    try {
        const addUser = await query(queryDB, [username, hashPassword, role]);
        if(addUser.rows.length < 0) {
            res.send("User not found");
        }
        else {
            res.send("User add successfully")
        }
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
                req.session.isAuth = true;
                req.session.user = userData.username;
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

const UserLogout = async (req, res) => {
    req.session.destroy(err => {
        if(err) throw err;
        res.redirect('/login');
    })
}



module.exports = {
    UserSignUp,
    UserLogIn,
    UserLogout
}