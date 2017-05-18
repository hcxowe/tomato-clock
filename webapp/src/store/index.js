import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
    userInfo: {
        userID: null,
        userName: '',
        email: ''
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});