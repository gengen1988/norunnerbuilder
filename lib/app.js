var express = require('express');
var requirejs = require('./requirejs');
var commonJsWrapper = require('./common-js-wrapper');

var app = module.exports = express();

app.get('/require.js', requirejs);
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.get(/^(?!\/bower_components).+\.js$/, commonJsWrapper);
app.use(express.static(__dirname + '/../public'));
