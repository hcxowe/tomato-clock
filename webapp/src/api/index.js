import * as data from './mock-data'
import moment from 'moment'

const delay = 1000;

export const siginUser = (userName, email, password, callback) => {
    setTimeout(()=>{

        let userList = data.userList;
        for (let i=0, size=data.userList.length; i < size; i++) {
            if (userList[i].email === email) {
                callback({
                    ret: -1,
                    message: '邮箱已注册'
                });

                return;
            }
        }

        userList.push({
            userID: userList.length,
            userName,
            email,
            password,
            activity: [],
            todoList: []
        });

        callback({
            ret: 0,
            message: 'success'
        })
    }, delay);
}

export const login = (email, password, callback) => {
    setTimeout( () => {
        let userList = data.userList;
        for (let i=0, size=data.userList.length; i < size; i++) {
            if (userList[i].email === email) {
                if (userList[i].password === password) {
                    callback({
                        ret: 0,
                        message: 'success',
                        body: {
                            userInfo: {
                                userID: userList[i].userID,
                                userName: userList[i].userName,
                                email: userList[i].email,
                            }
                        }
                    });
                }
                else {
                    callback({
                        ret: 100,
                        message: '密码输入错误'
                    });
                }

                return;
            }
        }

        callback({
            ret: 404,
            message: '账号不存在'
        });
    }, delay);
}

export const getActivityList = (userID, callback) => {
    setTimeout( () => {
        let userList = data.userList;
        for (let i=0, size=userList.length; i < size; i++) {
            if (userList[i].userID === userID) {
                callback({
                    ret: 0,
                    message: 'success',
                    body: {
                        activity: userList[i].activity
                    }
                });

                return;
            }
        }

        callback({
            ret: -1,
            message: 'not find activity',
            body: {
                activity: []
            }
        });
    }, delay);
}

export const addProject = (userID, description, callback) => {
    setTimeout(() => {
        let userList = data.userList;

        for (let i=0, size=userList.length; i < size; i++) {
            if (userList[i].userID === userID) {
                if (userList[i].activity.some(function(item) {return item.description == description;})) {
                    callback({
                        ret: -1,
                        message: '项目已经存在'
                    });

                    return;    
                }else {

                    let project = {
                        projectID: new Date().getTime(),
                        description: description,
                        taskList: []
                    };

                    userList[i].activity.push(project);

                    callback({
                        ret: 0,
                        messsage: 'success',
                        body: {
                            project
                        }
                    });

                    return;
                }
            }
        }

        callback({
            ret: -1,
            message: '未找到用户, 请重新登录!'
        });
    }, delay);
}

export const addTask = (userID, projectID, description, callback) => {
    setTimeout(() => {
        let userList = data.userList;
        let activity, taskList;

        for (let i=0, size=userList.length; i < size; i++) {
            if (userList[i].userID === userID) {
                activity = userList[i].activity;                
                break;
            }
        }

        if (!activity) {
            callback({
                ret: -1,
                message: '未找到用户, 请重新登录!'
            });

            return;
        }

        for (let j=0, len=activity.length; j < len; j++) {
            if (activity[j].projectID === projectID) {
                taskList = activity[j].taskList;                
                break;
            }
        }

        if (!taskList) {
            callback({
                ret: -1,
                message: '未找到项目, 请刷新页面重试!'
            });

            return;
        }

        for (let k=0, count=taskList.length; k < count; k++) {
            if (taskList[k].description === description) {
                callback({
                    ret: -1,
                    message: '该任务已存在'
                });

                return;
            }
        }

        let task = {
            taskID: moment().format('x'),
            description: description,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            handleTime: '',
            finishTime: '',
            potomaTima: []
        }

        taskList.push(task);

        callback({
            ret: 0,
            message: 'success',
            body: {
                task
            }
        });
    }, delay);
}

export const excuteTask = (projectID, taskID, callback) => {
    callback({
        ret: 0,
        message: 'success'
    });
}

export const backoutTask = (taskID, callback) => {
    callback({
        ret: 0,
        message: 'success'
    });
}