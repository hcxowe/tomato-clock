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
                        year: String,
                        month: String,
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

                callback(null, { code: 200, msg: 'success', body: userActivity.activity[0] });
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

                        callback(null, { code: 200, msg: 'success', body: userActivity.activity[userActivity.activity.length - 1] });
                    });
                }
                else {
                    callback({ code: 1201, msg: '活动已创建' });
                }
            });
        }
    })
}

function addTask(userID, projectID, description, callback) {
    UserActivity.find({ userID: userID }, (err, userActivity) => {
        if (err) {
            callback({ code: 1001, msg: '数据查询失败' });
            return;
        }

        if (userActivity.length == 0) {
            callback({ code: 1211, msg: '未找到项目' });
            return;
        }

        for (var i=0,len=userActivity[0].activity.length; i < len; i++) {
            if (userActivity[0].activity[i].projectID == projectID) {
                var task = {
                    projectID: projectID,
                    taskID: moment().format('x'),
                    status: 0,
                    description: description,
                    createTime: moment().format('YYYY-MM-DD hh:mm:ss'),
                    handleTime: '',
                    finishTime: '',
                    potomaTime: []
                };

                userActivity[0].activity[i].taskList.push(task);        
                break;
            }
        }

        userActivity[0].save((err, userActivity) => {
            if (err) {
                 callback({ code: 1002, msg: '数据写入失败' });
                return;
            }

            callback(null, { code: 200, msg: 'success', body: task });
        });
    });
}

function operateTask(userID, projectID, taskID, status, callback) {
    UserActivity.find({ userID: userID }, (err, userActivity) => {
        if (err) {
            callback({ code: 1001, msg: '数据查询失败' });
            return;
        }

        if (userActivity.length == 0) {
            callback({ code: 1211, msg: '未找到任务' });
            return;
        }

        var found = false;
        for (var i=0,len=userActivity[0].activity.length; i < len; i++) {
            if (userActivity[0].activity[i].projectID == projectID) {
                var taskList = userActivity[0].activity[i].taskList;
                for(var j=0,size=taskList.length; j<size; j++) {
                    if (taskList[j].taskID == taskID) {
                        taskList[j].status = status;
                        found = true;
                        break;
                    }
                }

                if (found == true) {
                    break;
                }
            }
        }

        if (found) {
            userActivity[0].save((err, userActivity) => {
                if (err) {
                    callback({ code: 1002, msg: '数据写入失败' });
                    return;
                }

                callback(null, { code: 200, msg: 'success' });
            });
        }
        else {
            callback({ code: 1211, msg: '未找到任务' });
        }
    });
}

function finishTomato(userID, projectID, taskID, task, callback) {
    UserActivity.find({ userID: userID }, (err, userActivity) => {
        if (err) {
            callback({ code: 1001, msg: '数据查询失败' });
            return;
        }

        if (userActivity.length == 0) {
            callback({ code: 1211, msg: '未找到任务' });
            return;
        }

        var found = false;
        for (var i=0,len=userActivity[0].activity.length; i < len; i++) {
            if (userActivity[0].activity[i].projectID == projectID) {
                var taskList = userActivity[0].activity[i].taskList;
                for(var j=0,size=taskList.length; j<size; j++) {
                    if (taskList[j].taskID == taskID) {
                        taskList[j].potomaTime.unshift(task);
                        found = true;
                        break;
                    }
                }

                if (found == true) {
                    break;
                }
            }
        }

        if (found) {
            userActivity[0].save((err, userActivity) => {
                if (err) {
                    callback({ code: 1002, msg: '数据写入失败' });
                    return;
                }

                callback(null, { code: 200, msg: 'success' });
            });
        }
        else {
            callback({ code: 1211, msg: '未找到任务' });
        }
    });
}

module.exports = {
    getActivity,
    addProject,
    addTask,
    operateTask,
    finishTomato
};