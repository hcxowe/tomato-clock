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

        activity = activity.length == 0 ? [] : activity[0].activity;
        callback(null, { code: 200, msg: 'success', body: activity });
        return;
    });
}

function addProject(userID, description, callback) {
    UserActivity.find({ userID: userID }, (err, userActivity) => {
        if (err) {
            callback({ code: 1001, msg: '数据查询失败' });
            return;
        }

        if (userActivity.length == 0) {
            var newUser = new UserActivity({
                userID: userID,
                activity: [{
                    projectID: moment().format('x'),
                    description: description,
                    taskList: []
                }]
            });

            newUser.save((err, userActivity) => {
                if (err) {
                    callback({ code: 1002, msg: '数据写入失败' });
                    return;
                }

                callback(null, { code: 200, msg: 'success', body: userActivity.activity });
            });
        }
        else {

            UserActivity.find({ userID: userID, 'activity.description': description}, (err, userActivity1) => {
                if (err) {
                    callback({ code: 1001, msg: '数据查询失败' });
                    return;
                }

                if (userActivity1.length == 0) {
                    userActivity[0].activity.push({
                        projectID: moment().format('x'),
                        description: description,
                        taskList: []
                    });

                    userActivity[0].save((err, userActivity) => {
                        if (err) {
                            callback({ code: 1002, msg: '数据写入失败' });
                            return;
                        }

                        callback(null, { code: 200, msg: 'success', body: userActivity.activity[userActivity.activity.length -1] });
                    });
                }
                else {
                    callback({ code: 1201, msg: '活动已创建' });
                }
            });
        }
    })
}

module.exports = {
    getActivity,
    addProject
};