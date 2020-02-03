const socketio = require('socket.io');

exports.setupWevSocket = (server) => {
    const io = socketio(server);

    io.on('connection', socket => {
        
    })
}