import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    userInfo: {
        userID: 0,
        userName: 'hcxowe',
        email: 'hcxowe@126.com',
        activity: [],
        currentTask: { potomaTime: [] },
        isExecuting: false
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});