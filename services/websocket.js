const app = require('express')();
const mongoServices = require('../helper/helpermongo');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const db = new mongoServices('power');
const collection = 'data';

const getConnection = io.on('connection', socket => {
    return console.log(`Socket Connected : ${socket.id}`)
})


module.exports = {
    getConnection,
}