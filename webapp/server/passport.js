var express     = require('express');
var path        = require('path');
var cookieParser= require('cookie-parser');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var MongoStore  = require('connect-mongo')(session);
var mongoose    = require('mongoose');
var passport    = require('passport');
var strategy    = require('passport-local').Strategy;

var db = mongoose.connect('mongodb:/localhost/hcxowe');
var User = mongoose.model('User', {
    userName: String,
    passWD: String
});

var app = express();

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
        maxAge: 60 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', new strategy((userName, passWD, done) => {
    User.findOne({ userName }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, { msg: '用户名不存在' });
        }

        return done(null, user);
    });
}));