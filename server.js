var express = require('express'),
    sio = require('socket.io');

app = express.createServer(
    express.bodyParser(),
    express.static('public')
);

app.configure(function () {
    app.set('host', '0.0.0.0');
});
app.listen(3000);

var io = sio.listen(app);

io.sockets.on('connection', function (socket) {
    socket.on('ping', function (data, fn) {
        socket.emit('ping', data);
        fn(Date.now());
        console.log(data);
        console.log('socket.id = ', socket.id);

    });

    socket.on('move', function (data) {
        console.log(data);
        socket.broadcast.emit('moving', {id: socket.id, coord: data});
    });

    socket.on('disconnect', function (data) {
        socket.broadcast.emit('closed', socket.id);
    });
});


