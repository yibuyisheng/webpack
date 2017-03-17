/**
 * @file index
 * @author yibuyisheng(yibuyisheng@163.com)
 */

import Vue from 'vue';
import Vuex from 'vuex';
import { isString, isObject, isError } from 'lodash';
import dashboard from './modules/dashboard';
import room from './modules/room';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        globalMessageList: [],
        redirectUrl: null,
        globalErrorList: []
    },
    mutations: {
        /* eslint-disable no-param-reassign */
        globalMessage(state, data) {
            let message;
            if (isString(data)) {
                message = {
                    type: 'info',
                    content: data
                };
            } else if (isObject(data)) {
                message = data;
            }

            if (message) {
                state.globalMessageList.splice(0, state.globalMessageList.length, message);
            }
        },
        unshiftGlobalMessage(state) {
            state.globalMessageList.splice(0, 1);
        },

        redirect(state, data) {
            state.redirectUrl = data;
        },

        error(state, data) {
            let error;
            if (isError(data)) {
                error = data;
            } else if (data && data.message) {
                error = new Error(data.message);
            } else if (isString(data)) {
                error = new Error(data);
            }

            if (error) {
                state.globalErrorList.splice(0, state.globalErrorList.length, error);
            }
        },
        unshiftGlobalError(state) {
            state.globalErrorList.splice(0, 1);
        },

        requestStart() {},
        requestEnd() {}
        /* eslint-enable no-param-reassign */
    },
    modules: {
        dashboard,
        room
    }
});
