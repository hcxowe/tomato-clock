var express         = require('express');
var path            = require('path');
var history         = require('connect-history-api-fallback');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var MongoStore      = require('connect-mongo')(session);
var getRandomStr    = require('./public');

var app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(cookieParser());

app.use(session({
    name: 'SESSION',
    store: new MongoStore({
        url: 'mongodb://localhost/hcxowe',
        autoRemove: 'native'
    }),
    secret: getRandomStr(128, true, true, false),
    cookie: {
        maxAge: 60 * 1000 * 5
    }
}));

app.use(history({
    index: '/index.html', // 默认首页
    resrites: [], // 改写请求
    disableDotRule: true,
    verbose: true,  // 日志
    logger: console.log.bind(console), // 日志函数
    htmlAcceptHeaders: ['text/html', '*/*']
}));

app.get('/', (req, res, next) => {
    if (req.cookies.isVisit) {
        console.log(req.cookies);
    }
    else {
        res.cookie('isVisit', 1, { maxAge: 60 * 1000 });
    }

    if(req.session.isVisit) {
        req.session.isVisit++;
        res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
    } 
    else {
        req.session.isVisit = 1;
        res.send("欢迎第一次来这里");
        console.log(req.session);
    }

    next();
});

app.listen(3124, 'localhost', function() {
    console.log('server run: http://localhost:3124');
});