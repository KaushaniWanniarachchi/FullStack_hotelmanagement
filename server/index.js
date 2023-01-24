const app = require('./config/express');
const config = require('./config/config')
// initialize mongo
require('./config/mongoose');
const app1 = require('express')();
const httpServer = require('http').createServer(app1);

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server,{
    cors: {
      origin: '*',
    }
  });

const port = 3000;

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('user joined');
    });

    socket.on('message', (data) => {
        console.log(data)
        io.in(data.room).emit('new message', { user: data.user, message: data.message });
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

app.listen(config.port, () => {
    console.log(`listening on port ${config.port} (${config.env})`);
});

// const app = require('express')();
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer, {
//   cors: {origin : '*'}
// });

// const port = 3000;

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('message', (message) => {
//     console.log(message);
//     io.emit('message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('a user disconnected!');
//   });
// });

// httpServer.listen(port, () => console.log(`listening on port ${port}`));