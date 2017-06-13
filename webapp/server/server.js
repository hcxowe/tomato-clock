var express         = require('express');
var path            = require('path');
var history         = require('connect-history-api-fallback');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var MongoStore      = require('connect-mongo')(session);

var getRandomStr    = require('./public');
var users           = require('./routes/users');

var app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    name: 'SESSION',
    store: new MongoStore({
        url: 'mongodb://localhost/hcxowe',
        autoRemove: 'native'
    }),
    secret: getRandomStr(128, true, true, false),
    cookie: {
        maxAge: 1 * 60 * 1000
    }
}));

app.use('/user', users);

app.use(history({
    index: '/index.html', // 默认首页
    resrites: [], // 改写请求
    disableDotRule: true,
    verbose: true,  // 日志
    logger: console.log.bind(console), // 日志函数
    htmlAcceptHeaders: ['text/html', '*/*']
}));

// 404
app.use(function(req, res, next) {
   
});

// 500
app.use(function(err, req, res, next) {
    
});

app.listen(3124, 'localhost', function() {
    console.log('server run: http://localhost:3124');
});