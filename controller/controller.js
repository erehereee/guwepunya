const { password } = require('pg/lib/defaults');
const bcrypt = require('bcrypt');
const pool = require('../helper/helperdb');
// const mongoServices = require('../helper/helpermongo');

// const db = new mongoServices('power');
// const collection = 'data';
let userState =[];
let userLogin = false
const getUser = async () => {
    try {
    const results = await pool.query("SELECT * FROM users");
    return results.rows; 
    }
    catch (error) {
        console.error('Database query failed:', error);
        throw new Error('Failed to retrieve user data');
    }
};

const UserSignUp = async (req, res) => {
    const { username, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const addUser = `INSERT INTO users (username, password, role) VALUES ('${username}','${hashPassword}', '${role}')`
    try {
        pool.query(addUser, (error, results) => {
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
    const dataUser = await getUser();
    userState = dataUser.find(user => user.username === username);
        try {
            if(await bcrypt.compare(password, userState.password)) {
                res.redirect('/');
                req.msg = "Login Successfully";
                console.log(req.msg);
                userLogin = true;
                
            }
            else {
                res.redirect('/login');
                req.msg = "Wrong password";
                console.log(req.msg);
                userLogin = false;
            }
        }
        catch {
            res.redirect('/login');
            req.msg = "User not found";
            res.status(500)
            console.log(req.msg)
            userLogin = false;
        }

}

const UserLogout = (req, res) => {
    if(userState.length < 1) {
        req.msg = "User not found. You must be login.";
        console.log(req.msg);
        userLogin = false;
        res.redirect('/login') 
    }
    else {
        userState = [];
        userLogin = false;
        res.redirect('/login')
        req.msg = "Logout Successfully";
        console.log(req.msg)
    }
}

async function AuthUser (req, res, next) {
    const dataUser = userState.username;
    if(dataUser == null) {
        req.msg = "You must sign in.";
        console.log(req.msg)
        res.redirect('/login')
    }
    else {
        req.user = dataUser;
        next();
    }
}

function checkLogin (req, res, next) {
    if(!userLogin) {
        next();
    }
    else {
        res.redirect('/')
    }
}

function AuthRole (role) {
        return (req, res, next) => {
            if(userState.role !== role) {
            res.status(401)
            return res.send("You not have permission to access this.")
        }else {
            next();
        }
}
}

const getData = async (req, res) => {
    try {
        pool.query("SELECT * from calculate_daily", (error, result) => {
            if(error) throw error;
            res.status(200).json(result.rows);
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('An error occurred while fetching data.');
    }
}

module.exports = {
    getUser,
    UserSignUp,
    UserLogIn,
    AuthUser,
    AuthRole,
    getData,
    UserLogout,
    checkLogin
}