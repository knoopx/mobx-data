var winston = require('winston');
var bodyParser = require('body-parser')

var feathers = require('feathers');
var rest = require('feathers-rest');
var logger = require('feathers-logger');
var memory = require('feathers-memory');

var app = feathers()
    .configure(logger(winston))
    .configure(rest())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use('/messages', memory);

app.use('/messages', memory);

export default app
