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

// authenticate
app.use(passport.initialize());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//     res.header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
//     next();
// });
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

// api router
app.use('/api/', routes);

// serve th index.html
app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')));

// catch the 404 and forward to error handler
app.use((req, res, next) => {
    const error = new HttpError(404);
    return next(error);
});

// error handler, stack trace
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
    next(err);
});

module.exports = app;
