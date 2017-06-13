var mongoose    = require('mongoose');

var db = mongoose.connect('mongodb://localhost/hcxowe', (err) => {
    if (err) {
        console.log('mongodb连接失败');
    }
    else {
        console.log('mongodb连接成功');
    }
});

module.exports = db;
