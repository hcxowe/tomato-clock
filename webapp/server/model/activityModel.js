var db      = require('./db');
var moment  = require('moment');

var UserActivity = db.model('Useractivity', {
    userID: String,
    activity: [{
        projectID: String,
        description: String,
        taskList: [
            {
                projectID:  String,
                taskID: String,
                description: String,
                status: Number,
                createTime: String,
                handleTime: String,
                finishTime: String,
                potomaTime: [
                    {
                        years: String,
                        mouth: String,
                        day: String,
                        startTime: String,
                        endTime: String,
                        status: Number
                    }
                ]
            }
        ]
    }]
});

function getActivity(userID, callback) {
    UserActivity.find({ userID: userID }, (err, activity) => {
        if (err) {
            callback({ code: 1001, msg: '数据查询失败' });
            return;
        }

        callback(null, { code: 200, msg: 'success', body: activity });
        return;
    });
}

function addProject()

module.exports = {
    getActivity
};