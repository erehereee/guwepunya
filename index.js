const express = require('express');
const { createServer } = require('node:http');
const expressLayouts = require('express-ejs-layouts');
const { Server } = require('socket.io');
const app = express();
const server = createServer(app);
const io = new Server(server);
const mqttServices = require('./services/mqttServices');
const router = require('./router/router');
const { sessionDB } = require('./helper/helperdb')
const { isAuth } = require('./controller/Auth') 
const port = 3000;
const cors = require('cors');

const MQTT_HOST_NAME = "mqtt://127.0.0.1:1883";

const mqttClient = new mqttServices(MQTT_HOST_NAME);

// mqttClient.connect();

// mqttClient.subscribe("data/pm/ATS", (err) => {
//     if(!err) {
//         console.log("Connected");
//     }
// });
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());
app.use(sessionDB);

app.use('/user', router);


app.get('/login', (req, res) => {
    res.render('login', {
        title : 'Login',
    })
})

app.use(expressLayouts);

app.get('/', isAuth, (req, res) => {
    res.render('index', {
        layout : 'layouts/main-layout',
        title : 'Dashboard',
        username : req.session.user
    })
})

app.get('/pm', isAuth, (req, res) => {
    res.render('plant', {
        layout : 'layouts/main-layout',
        title : 'Power Monitoring',
        username : req.session.user
    })
})

app.get('/pln', isAuth, (req, res) => {
    res.render('energy-pln', {
        layout : 'layouts/main-layout',
        title : 'EMon PLN',
        username : req.session.user
    })
})

app.get('/genset', isAuth, (req, res) => {
    res.render('energy-genset', {
        layout : 'layouts/main-layout',
        title : 'EMon Genset',
        username : req.session.user
    })
})

app.get('/report', isAuth, (req, res) => {
    res.render('report', {
        layout : 'layouts/main-layout',
        title : 'Report',
        username : req.session.user
    })
})

app.use((req,res) => {
    res.redirect('/')
})

// io.on("connection", socket => {
//     console.log(`Socket Connected : ${socket.id}`);
//     // socket.on('disconnect', () => {
//     //     console.log(`User with id : ${socket.id} disconnected`);
//     // });
//     socket.on('minta', (message) => {
//         console.log(message)
//         socket.emit('data', 'napa tu data')
//     })
// })


server.listen(port, console.log(`Server listening on port : ${port}`));
