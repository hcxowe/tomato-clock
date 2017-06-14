var db      = require('./db');
var moment  = require('moment');

var UserInfo = db.model('UserInfo', {
    userID: String,
    userName: String,
    email: String,
    passWD: String,
    cTime: String,
    activity: Array
});

function signin(userName, email, passWD, callback) {
    new Promise((resolve, reject) => {
        UserInfo.find({ email: email }, (err, user) => {
            if (err) {
                reject({ code: 1001, msg: '数据查询失败' });
                return;
            }
            else if (user && (user.length != 0)) {
                reject({ code: 1101, msg: '邮箱已注册' });
                return;
            }
            
            resolve()
        });
    }).then(() => {
        var newUser = new UserInfo({
            userID: moment().format('x'),
            userName,
            email,
            passWD,
            cTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            activity: []
        });

        newUser.save((err, user) => {
            if (err) {
                callback({ code: 1002, msg: '数据写入失败' });
                return;
            }
            
            callback(null, user);
        });
    }, (retData) => {
        callback(retData);
    });
}

function login(email, passWD, callback) {
    new Promise((resolve, reject) => {
        UserInfo.find({ email: email }, (err, user) => {
            if (err) {
                reject({ code: 1001, msg: '数据查询失败' });
                return;
            }
            else if (!user || (user.length == 0)) {
                reject({ code: 1102, msg: '账号不存在' });
                return;
            }

            if (user[0].passWD == passWD) {
                resolve(user[0]);
            }
            else {
                reject({ code: 1103, msg: '密码不正确' });
            }
        });
    }).then((user) => {
        callback(null, user);
    }, (retData) => {
        callback(retData);
    });
}

module.exports = {
    signin,
    login
};