import * as types from './types'

export default {
    [types.LOGINUSER]: (state, data) => {
        state.userInfo = data;
    }
}