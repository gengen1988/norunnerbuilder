var http = require('http');
var app = require('./lib/app');

var appServer = http.createServer(app);
appServer.listen(1337);
