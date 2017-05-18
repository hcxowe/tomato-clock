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
    }
}