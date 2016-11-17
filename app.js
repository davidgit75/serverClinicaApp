var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

var controllers = require('./controllers/requests');
var config = require('./config');
var middlewares = require('./controllers/middlewares');

var app = express();
var server = http.Server(app);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(config.database);

app.use('/clinicapp', middlewares.checkUser);
app.use('/clinicapp', controllers);

server.listen(process.env.PORT | 3000);

module.exports = app;
