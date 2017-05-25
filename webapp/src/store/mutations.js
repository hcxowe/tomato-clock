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
    }
}