var express = require('express');
var path = require('path');
var history = require('connect-history-api-fallback');

var app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(history({
    disableDotRule: true,
    verbose: true
}));

var server = app.listen(3124, function() {
    console.log('start server: %j', server);
});