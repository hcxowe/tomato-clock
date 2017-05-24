import * as types from './types'

export default {
    [types.LOGINUSER]: (state, data) => {
        state.userInfo = data;
    },

    [types.GETACTIVITYLIST]: (state, data) => {
        state.userInfo.activity = data;
    }
}