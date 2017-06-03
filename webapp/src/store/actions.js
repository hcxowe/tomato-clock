import * as types from './types'
import * as api from '../api/index'

export default {
    [types.SIGINUSER]: ({ commit }, { userName, email, password }) => {
        return new Promise((resolve, reject) => {
            api.siginUser(userName, email, password, (ret)=>{
                if (ret.ret != 0) {
                    reject(ret.message);
                    return;
                }

                resolve();
            })
        })
    },

    [types.LOGINUSER]: ({ commit }, { email, password }) => {
        return new Promise((resolve, reject) => {
            api.login(email, password, (ret) => {
                if (ret.ret != 0) {
                    reject(ret.message);
                    return;
                }

                commit(types.LOGINUSER, ret.body.userInfo);
                resolve();
            })
        })
    },

    [types.GETACTIVITYLIST]: ({ commit }, { userID }) => {
        return new Promise((resolve, reject) => {
            api.getActivityList(userID, ({ ret, message, body }) => {
                if (ret != 0) {
                    reject(message);
                    return;
                }

                commit(types.GETACTIVITYLIST, body.activity);
                resolve();
            })
        })
    },

    [types.ADDPROJECT]: ({ commit }, { userID, description }) => {
        return new Promise((resolve, reject) => {
            api.addProject(userID, description, ({ ret, message, body}) => {
                if (ret != 0) {
                    reject(message);
                    return;
                }

                commit(types.ADDPROJECT, body.project);
                resolve();
            });
        })
    },

    [types.ADDTASK]: ({ commit }, { userID, projectID, description }) => {
        
        return new Promise((resolve, reject) => {
            api.addTask(userID, projectID, description, ({ ret, message, body }) => {
                if (ret != 0) {
                    reject(message);
                    return;
                }

                commit(types.ADDTASK, { projectID, task: body.task });
                resolve();
            })
        })
    },

    [types.EXCUTETASK]: ({ commit }, { projectID, taskID }) => {
        return new Promise((resolve, reject) => {
            api.excuteTask(projectID, taskID, ({ ret, message }) => {
                if (ret != 0) {
                    reject(message);
                    return;
                }

                commit(types.EXCUTETASK, { projectID, taskID });
                resolve();
            })
        })
    },

    [types.BACKOUTTASK]: ({ commit }, { taskID }) => {
        return new Promise((resolve, reject) => {
            api.backoutTask(taskID, ({ ret, message }) => {
                if (ret != 0) {
                    reject(message);
                    return;
                }

                commit(types.BACKOUTTASK, { taskID });
                resolve();
            })
        })
    },

    [types.FINISHTASK]: ({ commit }, { taskID }) => {
        return new Promise((resolve, reject) => {
            api.finishTask(taskID, ({ ret, message }) => {
                if (ret != 0) {
                    reject(message);
                    return;
                }

                commit(types.FINISHTASK, { taskID });
                resolve();
            })
        })
    },

    [types.FINISHPOMATO]: ({ commit }, { taskID, pomato }) => {
        return new Promise((resolve, reject) => {
            api.finishPomato(taskID, pomato, ({ ret, message }) => {
                if (ret != 0) {
                    reject(message);
                    return;
                }

                commit(types.FINISHPOMATO, { taskID, pomato });
                resolve();
            })
        })
    }    
}