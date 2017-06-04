import * as types from './types'
import _ from 'lodash'

export default {
    [types.LOGINUSER]: (state, data) => {
        state.userInfo = data;
    },

    [types.GETACTIVITYLIST]: (state, data) => {
        state.userInfo.activity = data.map(function(item) {
            if (typeof item === 'object') {
                return _.defaultsDeep({}, item);
            }else {
                return item;
            }
        });
    },

    [types.ADDPROJECT]: (state, data) => {
        state.userInfo.activity.push(_.defaultsDeep({}, data));
    },

    [types.ADDTASK]: (state, { projectID, task }) => {
        for (let i=0,len=state.userInfo.activity.length; i<len; i++) {
            if (state.userInfo.activity[i].projectID == projectID) {
                state.userInfo.activity[i].taskList.push(_.defaultsDeep({}, task));
            }
        }
    },

    [types.EXCUTETASK]: (state, { projectID, taskID }) => {
        for (let i=0,len=state.userInfo.activity.length; i<len; i++) {
            if (state.userInfo.activity[i].projectID == projectID) {
                var taskList = state.userInfo.activity[i].taskList;
                if (typeof taskList!= 'undefined') {
                    for (let j=0, size=taskList.length; j<size; j++) {
                        if (taskList[j].taskID == taskID) {
                            taskList[j].status = 1;
                            return;
                        }
                    }
                }
            }
        }
    },

    [types.BACKOUTTASK]: (state, { taskID }) => {
        var taskList = null;
        for (let i=0,len=state.userInfo.activity.length; i<len; i++) {
            taskList = state.userInfo.activity[i].taskList;
            if (typeof taskList != 'undefined') {
                for (let j=0, size=taskList.length; j<size; j++) {
                    if (taskList[j].taskID == taskID) {
                        taskList[j].status = 0;
                        return;
                    }
                }
            }
        }
    },

    [types.FINISHTASK]: (state, { taskID }) => {
        var taskList = null;
        for (let i=0,len=state.userInfo.activity.length; i<len; i++) {
            taskList = state.userInfo.activity[i].taskList;
            if (typeof taskList != 'undefined') {
                for (let j=0, size=taskList.length; j<size; j++) {
                    if (taskList[j].taskID == taskID) {
                        taskList[j].status = 2;
                        taskList[j].complete = true;
                        return;
                    }
                }
            }
        }
    },

    [types.SELECTTASK]: (state, task) => {
        state.userInfo.currentTask = _.defaultsDeep({}, task);
    },

    [types.EXCUTINGPOMATO]: (state) => {
        state.userInfo.isExecuting = true;
    },

    [types.FINISHPOMATO]: (state, { taskID, pomato }) => {
        var taskList = null;
        for (let i=0,len=state.userInfo.activity.length; i<len; i++) {
            taskList = state.userInfo.activity[i].taskList;
            if (typeof taskList != 'undefined') {
                for (let j=0, size=taskList.length; j<size; j++) {
                    if (taskList[j].taskID == taskID) {
                        taskList[j].potomaTime.push(_.defaults({}, pomato));
                        state.userInfo.currentTask.potomaTime.unshift(_.defaults({}, pomato));
                        state.userInfo.isExecuting = false;
                        return;
                    }
                }
            }
        }
    }
}