const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../routes');
const passport = require('../middleware/passport');
const HttpError = require('http-errors');


const app = express();


if(config.env==='development') {
    app.use(logger('dev'));
}


const distDir = path.join(__dirname, '../../dist')


app.use(express.static(distDir));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(helmet());


app.use(cors());


app.use(passport.initialize());


const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});


app.use('/api/', routes);


app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')));


app.use((req, res, next) => {
    const error = new HttpError(404);
    return next(error);
});


app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;
